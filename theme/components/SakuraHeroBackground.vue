<script lang="ts" setup>
import type { $Transition } from 'motion-v'
import { motion } from 'motion-v'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useThemeConfig } from '../composables'
import { getYouTubeId, isVideoUrl, isYouTubeUrl } from '../core/utils'
import { findYouTubePlayer } from '../core/utils/youtubePlayer'
import { useSakuraAppStore } from '../stores'

const props = withDefaults(defineProps<{
  urls?: string[] | string
}>(), {})

const visitedUrls = ref<number[]>([])
const randomIndex = ref(0)

const sakura = useSakuraAppStore()
const themeConfig = useThemeConfig()
// const rootBackground = useCssVar('--sakura-custom-bg')

const urls = computed(() => props.urls || themeConfig.value.hero.urls || '')
const hero = computed(() => themeConfig.value.hero)

function nextRandomIndex(length: number, visited: number[], lastIndex: number) {
  if (length <= 1)
    return 0

  const visitedSet = new Set(visited)
  if (visitedSet.size >= length)
    visitedSet.clear()

  let index = Math.floor(Math.random() * length)
  let tries = 0
  while ((visitedSet.has(index) || index === lastIndex) && tries < 80) {
    index = Math.floor(Math.random() * length)
    tries += 1
  }

  if (index === lastIndex) {
    index = (lastIndex + 1) % length
    if (visitedSet.size >= length - 1 && index === lastIndex)
      index = (lastIndex + 2) % length
  }

  return index
}

watch(
  [() => sakura.wallpaperIndex, () => hero.value.randomUrls, () => sakura.wallpaperManual, urls],
  () => {
    if (!hero.value.randomUrls || sakura.wallpaperManual) {
      visitedUrls.value = []
      randomIndex.value = sakura.wallpaperIndex
      sakura.wallpaperDisplayIndex = randomIndex.value
      return
    }

    if (!Array.isArray(urls.value) || !urls.value.length) {
      visitedUrls.value = []
      randomIndex.value = 0
      sakura.wallpaperDisplayIndex = 0
      return
    }

    const length = urls.value.length
    const next = nextRandomIndex(length, visitedUrls.value, randomIndex.value)
    if (!visitedUrls.value.includes(next))
      visitedUrls.value.push(next)
    randomIndex.value = next
    sakura.wallpaperDisplayIndex = next
  },
  { immediate: true, flush: 'sync' },
)

const currentWallpaperUrl = computed(() => {
  if (typeof urls.value === 'string')
    return urls.value

  if (hero.value.randomUrls && !sakura.wallpaperManual) {
    return urls.value[randomIndex.value] || ''
  }
  return urls.value[sakura.wallpaperIndex] || ''
})

const currentMediaUrl = computed(() => currentWallpaperUrl.value)
const isCurrentMediaYouTube = computed(() => isYouTubeUrl(currentWallpaperUrl.value || ''))
const isCurrentMediaVideo = computed(() => !isCurrentMediaYouTube.value && isVideoUrl(currentWallpaperUrl.value || ''))

type LayerOperation = 'prevMedia' | 'nextMedia' | ''
interface ActiveMedia {
  url: string
  isVideo: boolean
  isYouTube: boolean
  isPlaying: boolean
}

interface MediaLayer extends ActiveMedia {
  id: number
  leaving: boolean
  operation: LayerOperation
}

const layers = ref<MediaLayer[]>([])
const nextLayerId = ref(0)
const lastOperation = ref<LayerOperation>('')
const removalTimers = new Map<number, number>()
const revealed = ref(false)

const canUseFixedAttachment = computed(() => {
  if (!hero.value.fixedImg)
    return false
  if (layers.value.length !== 1)
    return false
  return !layers.value[0]?.leaving
})

const preloadCache = new Map<string, HTMLImageElement>()

function layerDurationSeconds(operation: LayerOperation) {
  return operation ? 1 : 0.5
}

function layerTransition(operation: LayerOperation): $Transition {
  if (operation) {
    return {
      duration: 1,
      ease: 'easeInOut',
    }
  }
  return {
    duration: 0.5,
    ease: 'easeOut',
  }
}

function layerInitial(operation: LayerOperation) {
  if (operation === 'nextMedia')
    return { x: '100%', y: 0 }
  if (operation === 'prevMedia')
    return { x: '-100%', y: 0 }
  return { opacity: 0, x: '0%', y: 0 }
}

function layerAnimate(layer: MediaLayer) {
  const { operation, leaving } = layer
  if (operation === 'nextMedia')
    return { x: leaving ? '-100%' : '0%', y: 0 }
  if (operation === 'prevMedia')
    return { x: leaving ? '100%' : '0%', y: 0 }
  return { opacity: leaving ? 0 : 1, x: '0%', y: 0 }
}

function preloadUrl(url: string) {
  if (typeof window === 'undefined')
    return
  if (!url || preloadCache.has(url))
    return
  if (isYouTubeUrl(url) || isVideoUrl(url))
    return
  const img = new Image()
  img.src = url
  preloadCache.set(url, img)
}

function preloadAroundIndex(index: number) {
  if (!Array.isArray(urls.value))
    return
  const length = urls.value.length
  if (!length)
    return
  const next = urls.value[(index + 1) % length]
  const prev = urls.value[(index - 1 + length) % length]
  if (next)
    preloadUrl(next)
  if (prev)
    preloadUrl(prev)
}

function scheduleRemoveLayer(id: number, seconds: number) {
  const existing = removalTimers.get(id)
  if (existing !== undefined)
    window.clearTimeout(existing)
  const timer = window.setTimeout(() => {
    removalTimers.delete(id)
    layers.value = layers.value.filter(l => l.id !== id)
  }, Math.max(0, seconds) * 1000)
  removalTimers.set(id, timer)
}

function youtubePlayerOf(layer: MediaLayer) {
  return findYouTubePlayer(getYouTubeId(layer.url) || '')
}

function resumeVideoLayer(layer: MediaLayer) {
  nextTick(() => {
    const video = document.getElementById(`sakura-hero-video-${layer.id}`) as HTMLVideoElement | null
    video?.play().catch(() => {})
  })
}

watch(
  () => sakura.wallpaperIsPlaying,
  (playing) => {
    const layer = layers.value.at(-1)
    if (!layer || layer.leaving)
      return
    const shouldPlay = playing && (layer.isVideo || layer.isYouTube)
    if (layer.isPlaying === shouldPlay)
      return
    layer.isPlaying = shouldPlay
    if (layer.isYouTube)
      youtubePlayerOf(layer)?.playVideo()
    else if (layer.isVideo)
      resumeVideoLayer(layer)
  },
  { flush: 'sync' },
)

watch(
  () => sakura.wallpaperSoundEnabled,
  (enabled) => {
    layers.value.forEach((layer) => {
      if (layer.leaving)
        return
      const video = document.getElementById(`sakura-hero-video-${layer.id}`) as HTMLVideoElement | null
      if (video)
        video.muted = !enabled
    })
  },
  { flush: 'sync' },
)

watch(
  () => sakura.wallpaperOperation,
  (op) => {
    if (op)
      lastOperation.value = op
  },
  { flush: 'sync' },
)

watch(
  [currentMediaUrl, isCurrentMediaVideo, isCurrentMediaYouTube],
  () => {
    const url = currentMediaUrl.value || ''
    if (!url) {
      for (const timer of removalTimers.values())
        window.clearTimeout(timer)
      removalTimers.clear()
      layers.value = []
      sakura.wallpaperIsPlaying = false
      return
    }

    preloadUrl(url)
    if (!hero.value.randomUrls)
      preloadAroundIndex(sakura.wallpaperIndex)

    const isPlaying = sakura.wallpaperIsPlaying && (isCurrentMediaVideo.value || isCurrentMediaYouTube.value)
    if (isPlaying !== sakura.wallpaperIsPlaying)
      sakura.wallpaperIsPlaying = isPlaying

    if (!isCurrentMediaVideo.value && !isCurrentMediaYouTube.value)
      sakura.wallpaperSoundEnabled = false

    const next: ActiveMedia = {
      url,
      isVideo: isCurrentMediaVideo.value,
      isYouTube: isCurrentMediaYouTube.value,
      isPlaying,
    }

    const last = layers.value.at(-1)
    if (last && last.url === next.url && last.isPlaying === next.isPlaying)
      return

    const operation = (lastOperation.value || '') as LayerOperation
    if (last) {
      const leaving = { ...last, leaving: true, operation }
      layers.value = [...layers.value.slice(0, -1), leaving]
      scheduleRemoveLayer(leaving.id, layerDurationSeconds(operation))
    }

    const id = (nextLayerId.value += 1)
    const nextLayer: MediaLayer = {
      id,
      url: next.url,
      isVideo: next.isVideo,
      isYouTube: next.isYouTube,
      isPlaying: next.isPlaying,
      leaving: false,
      operation,
    }
    layers.value = [...layers.value, nextLayer].slice(-2)
  },
  { immediate: true, flush: 'sync' },
)

watch(() => sakura.wallpaperIndex, () => {
  const length = Array.isArray(urls.value) ? urls.value.length : (urls.value ? 1 : 0)
  if (!length)
    return
  if (sakura.wallpaperIndex >= length)
    sakura.wallpaperIndex = 0
}, { immediate: true, flush: 'sync' })

watch(() => (Array.isArray(urls.value) ? urls.value.length : (urls.value ? 1 : 0)), (length) => {
  sakura.wallpaperLength = length
}, { immediate: true })

onMounted(() => {
  nextTick(() => {
    if (sakura.introEnded)
      revealed.value = true
  })
})

watch(() => sakura.introEnded, (ended) => {
  if (ended)
    revealed.value = true
})

onBeforeUnmount(() => {
  for (const timer of removalTimers.values())
    window.clearTimeout(timer)
  removalTimers.clear()
})

// onMounted(() => {
//   rootBackground.value = `url(${currentWallpaperUrl.value})`
// })
</script>

<template>
  <div class="sakura-hero-background" :class="{ 'is-revealed': revealed }">
    <template v-if="layers.length">
      <template v-for="(layer, index) in layers" :key="layer.id">
        <motion.div
          v-if="layer.isYouTube"
          class="sakura-hero-background-layer sakura-hero-background-yt"
          :class="{ 'is-player': layer.isPlaying }"
          :initial="layer.leaving ? false : layerInitial(layer.operation)"
          :animate="layerAnimate(layer)"
          :transition="layerTransition(layer.operation)"
          :style="{ zIndex: index + 1 }"
        >
          <SakuraHeroYouTubeLayer
            :layer
            class="sakura-hero-background-yt-frame"
            :aria-hidden="!layer.isPlaying"
          />
        </motion.div>

        <motion.video
          v-else-if="layer.isVideo"
          :id="`sakura-hero-video-${layer.id}`"
          class="sakura-hero-background-layer min-h-full min-w-full object-cover"
          preload="auto" autoplay :loop="!layer.isPlaying" :muted="!sakura.wallpaperSoundEnabled"
          :disable-picture-in-picture="hero.disablePictureInPicture"
          :initial="layer.leaving ? false : layerInitial(layer.operation)"
          :animate="layerAnimate(layer)"
          :transition="layerTransition(layer.operation)"
          :style="{ zIndex: index + 1 }"
        >
          <source :src="layer.url" type="video/mp4">
          Your browser does not support video tags
        </motion.video>

        <motion.div
          v-else
          class="sakura-hero-background-layer sakura-hero-background-img"
          :initial="layer.leaving ? false : layerInitial(layer.operation)"
          :animate="layerAnimate(layer)"
          :transition="layerTransition(layer.operation)"
          :style="{ zIndex: index + 1, backgroundImage: `url(${layer.url})`, backgroundAttachment: canUseFixedAttachment ? 'fixed' : 'scroll' }"
        />
      </template>
    </template>
    <div v-else class="sakura-hero-background-default h-full w-full" />
  </div>
</template>

<style lang="scss">
.sakura-hero-background {
  height: 100dvh;
  width: 100%;
  overflow: hidden;
  position: relative;
  isolation: isolate;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;
    width: 350%;
    height: 100%;
    background: linear-gradient(
      102.93deg,
      oklch(85.31% 0.067 228.7 / 0%) 0%,
      oklch(85.31% 0.067 228.7 / 40%) 12.73%,
      oklch(84.24% 0.065 234.5 / 60%) 26.47%,
      oklch(73.03% 0.094 295.3) 40.62%,
      oklch(81.79% 0.095 354.5) 54.56%,
      oklch(83.63% 0.095 47.8) 68.8%,
      oklch(95.61% 0.098 100.5) 80.28%,
      oklch(86.39% 0.104 145.8) 91.22%,
      oklch(86.39% 0.104 145.8 / 0%) 100%
    );
    mix-blend-mode: hard-light;
    opacity: 0.9;
    content: '';
    pointer-events: none;
    will-change: transform;
  }

  &::before {
    position: absolute;
    inset: 0;
    z-index: 4;
    background: oklch(100% 0 0);
    opacity: 0;
    content: '';
    pointer-events: none;
  }

  &.is-revealed {
    &::after {
      animation: sakura-hero-rainbow 6s forwards;
    }

    &::before {
      animation: sakura-hero-flash 0.8s 0.3s forwards;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &::before,
    &::after {
      animation: none;
      opacity: 0;
    }
  }

  &-layer {
    position: absolute;
    inset: 0;
    will-change: transform, opacity;
  }

  &-img {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    object-fit: cover;
  }

  &-yt {
    overflow: hidden;
    pointer-events: none;

    &-frame {
      position: absolute;
      top: 50%;
      left: 50%;
      width: max(100%, 177.78vh);
      height: max(100%, 56.25vw);
      border: 0;
      pointer-events: none;
      transform: translate(-50%, -50%);
    }

    &.is-player &-frame {
      width: 100%;
      height: 100%;
    }
  }

  &-default {
    background: linear-gradient(45deg, var(--sakura-color-primary), var(--sakura-color-primary));
    background-size: 600% 600%;
    animation: gradient-background 10s ease infinite;
  }

  @keyframes gradient-background {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }
}

@keyframes sakura-hero-rainbow {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(350%);
  }
}

@keyframes sakura-hero-flash {
  0% {
    opacity: 0;
    mix-blend-mode: normal;
  }

  50% {
    opacity: 0.5;
    mix-blend-mode: hard-light;
  }

  100% {
    opacity: 0;
    mix-blend-mode: normal;
  }
}
</style>

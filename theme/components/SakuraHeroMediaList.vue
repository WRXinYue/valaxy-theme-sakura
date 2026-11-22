<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useThemeConfig } from '../composables'
import { getYouTubeId, isVideoUrl, isYouTubeUrl } from '../core/utils'
import { YouTubeProgressTracker } from '../core/utils/youtubeProgress'
import { useSakuraAppStore } from '../stores'

const themeConfig = useThemeConfig()
const sakura = useSakuraAppStore()

type MediaKind = 'image' | 'video' | 'youtube'

const isVisible = ref(false)
let hideTimer: ReturnType<typeof setTimeout> | undefined
const progress = ref(0)
let progressTimer: ReturnType<typeof setInterval> | undefined
const youtubeProgress = new YouTubeProgressTracker()

function showList() {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = undefined
  }
  isVisible.value = true
}

function scheduleHide() {
  if (hideTimer)
    clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    hideTimer = undefined
    isVisible.value = false
  }, 120)
}

onBeforeUnmount(() => {
  if (hideTimer)
    clearTimeout(hideTimer)
  if (progressTimer)
    clearInterval(progressTimer)
  youtubeProgress.stop()
})

const wallpaperUrls = computed(() => {
  const urls = themeConfig.value.hero.urls
  if (Array.isArray(urls))
    return urls
  return urls
    ? [urls]
    : []
})

const items = computed(() => wallpaperUrls.value)

const activeIndex = computed(() => {
  if (!items.value.length)
    return -1
  return sakura.wallpaperDisplayIndex
})

function kindOf(url: string): MediaKind {
  if (isYouTubeUrl(url))
    return 'youtube'
  if (isVideoUrl(url))
    return 'video'
  return 'image'
}

function youTubePoster(url: string) {
  const id = getYouTubeId(url)
  return id
    ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
    : ''
}

function videoPoster(url: string) {
  return `${url}#t=0.1`
}

function itemLabel(index: number) {
  return `${kindOf(items.value[index] || '') === 'image'
    ? 'Wallpaper'
    : 'Video'} ${index + 1}`
}

function select(index: number) {
  if (index === activeIndex.value)
    return
  sakura.selectWallpaper(index)
}

function activeVideoEl() {
  const url = items.value[activeIndex.value]
  if (!url || kindOf(url) !== 'video')
    return null
  const videos = document.querySelectorAll<HTMLVideoElement>('.sakura-hero-background video')
  return [...videos].find(video => video.querySelector('source')?.getAttribute('src') === url) ?? null
}

function updateProgress() {
  const url = items.value[activeIndex.value]
  const youtubeValue = youtubeProgress.update(url)
  if (youtubeValue !== null) {
    progress.value = youtubeValue
    return
  }

  const video = activeVideoEl()
  if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
    progress.value = 0
    return
  }
  progress.value = Math.min(1, video.currentTime / video.duration)
}

onMounted(() => {
  youtubeProgress.start()
  updateProgress()
  progressTimer = setInterval(updateProgress, 250)
})
</script>

<template>
  <aside
    v-if="items.length > 1"
    class="sakura-hero-media-list"
    :class="{ 'is-visible': isVisible }"
    aria-label="Hero media list"
    @mouseenter="showList"
    @mouseleave="scheduleHide"
  >
    <div
      class="sakura-hero-media-list-trigger"
      :style="`--sakura-media-progress:${progress}`"
      aria-hidden="true"
    />

    <div
      class="sakura-hero-media-list-track"
      :aria-hidden="!isVisible"
      :inert="!isVisible"
    >
      <button
        v-for="(item, index) in items"
        :key="`${item}-${index}`"
        class="sakura-hero-media-list-item"
        :class="{ 'is-active': index === activeIndex }"
        type="button"
        :aria-label="itemLabel(index)"
        :aria-current="index === activeIndex"
        @click="select(index)"
      >
        <img
          v-if="kindOf(item) === 'image'"
          class="sakura-hero-media-list-poster"
          :src="item"
          alt=""
          loading="lazy"
        >
        <video
          v-else-if="kindOf(item) === 'video'"
          class="sakura-hero-media-list-poster"
          :src="videoPoster(item)"
          muted
          playsinline
          preload="metadata"
        />
        <img
          v-else
          class="sakura-hero-media-list-poster"
          :src="youTubePoster(item)"
          alt=""
          loading="lazy"
        >

        <span v-if="kindOf(item) !== 'image'" class="sakura-hero-media-list-play" aria-hidden="true">
          <div i-solar-play-bold />
        </span>
      </button>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.sakura-hero-media-list {
  position: absolute;
  top: 50%;
  left: 16px;
  z-index: 11;
  height: 60vh;
  transform: translateY(-50%);

  &-trigger {
    position: relative;
    width: 24px;
    height: 100%;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 12px;
      width: 2px;
      background: var(--sakura-color-background);
      border-radius: 999px;
    }

    &::before {
      top: 50%;
      height: 48px;
      opacity: 0.35;
      transform: translateY(-50%);
      transition: opacity 0.2s ease;
    }

    &::after {
      bottom: calc(50% - 24px);
      height: calc(48px * var(--sakura-media-progress, 0));
      transition:
        height 0.25s linear,
        opacity 0.2s ease;
    }
  }

  &.is-visible &-trigger::before,
  &.is-visible &-trigger::after {
    opacity: 0;
  }

  &-track {
    position: absolute;
    top: 50%;
    left: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 70vh;
    padding: 4px;
    overflow-y: auto;
    opacity: 0;
    pointer-events: none;
    transform: translate(-100%, -50%);
    transition:
      opacity 0.2s ease,
      transform 0.28s cubic-bezier(0.19, 1, 0.22, 1);
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &.is-visible &-track {
    opacity: 1;
    pointer-events: auto;
    transform: translate(0, -50%);
  }

  &-item {
    position: relative;
    flex: 0 0 auto;
    width: 56px;
    height: 84px;
    padding: 0;
    overflow: hidden;
    background: oklch(0% 0 0 / 35%);
    border: 1px solid oklch(100% 0 0 / 25%);
    border-radius: 10px;
    opacity: 0.7;
    cursor: pointer;
    transition:
      opacity 0.2s ease,
      transform 0.2s ease,
      border-color 0.2s ease;

    &:hover {
      opacity: 1;
      transform: translateX(3px);
    }

    &.is-active {
      border-color: var(--sakura-color-primary);
      opacity: 1;
      box-shadow: 0 0 0 2px oklch(from var(--sakura-color-primary) l c h / 45%);
      transform: translateX(3px);
    }
  }

  &-poster {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &-play {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: white;
    background: oklch(0% 0 0 / 25%);
  }
}

@media (width <= 768px) {
  .sakura-hero-media-list {
    display: none;
  }
}
</style>

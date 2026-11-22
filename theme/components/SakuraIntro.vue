<script lang="ts" setup>
import { useSiteConfig } from 'valaxy'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import petalUrl from '../assets/sakura-petal.png'
import { useThemeConfig } from '../composables'
import { getYouTubeId, isVideoUrl, isYouTubeUrl } from '../core/utils'
import { useSakuraAppStore } from '../stores'

const STORAGE_KEY = 'sakura-intro-seen'
const PLAY_DURATION = 4500
const LEAVE_DURATION = 800
const MASK_FADE_DURATION = 800
const MOVE_DURATION = 1000
const PETAL_COUNT = 50

interface Petal {
  x: number
  y: number
  scale: number
  alpha: number
  rotation: number
  drift: number
  fall: number
  spin: number
}

const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()
const sakura = useSakuraAppStore()

const isActive = ref(false)
const isLeaving = ref(false)
const isMaskHidden = ref(false)
const petalCanvas = ref<HTMLCanvasElement | null>(null)
const wordEls = ref<HTMLElement[]>([])
const typedTitle = ref('')
const isTyped = ref(false)

let finishTimer: ReturnType<typeof setTimeout> | undefined
let removeTimer: ReturnType<typeof setTimeout> | undefined
let typeTimer: ReturnType<typeof setTimeout> | undefined
let moveTimer: ReturnType<typeof setTimeout> | undefined
let previousOverflow = ''
let petalFrameId: number | undefined
let petalResizeHandler: (() => void) | undefined
let petalLoopActive = false
let fontsSettled = false

const title = computed(() => themeConfig.value.hero.title || siteConfig.value.title || '')
const words = computed(() => title.value.split(/\s+/).filter(Boolean))

const wallpapers = computed(() => {
  const urls = themeConfig.value.hero.urls
  if (Array.isArray(urls))
    return urls
  return urls ? [urls] : []
})

const currentMediaUrl = computed(() => {
  const list = wallpapers.value
  if (!list.length)
    return ''
  return list[sakura.wallpaperDisplayIndex] || list[0] || ''
})

const isCurrentVideo = computed(() => isVideoUrl(currentMediaUrl.value))

const backgroundUrl = computed(() => {
  const current = currentMediaUrl.value
  if (current && !isVideoUrl(current) && !isYouTubeUrl(current))
    return current
  if (isYouTubeUrl(current)) {
    const id = getYouTubeId(current)
    return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : ''
  }
  return wallpapers.value.find(url => !isVideoUrl(url) && !isYouTubeUrl(url)) || ''
})

const backgroundStyle = computed(() => backgroundUrl.value
  ? { backgroundImage: `url(${backgroundUrl.value})` }
  : undefined)

const restTitle = computed(() => {
  const characters = Array.from(title.value)
  return characters.slice(Array.from(typedTitle.value).length).join('')
})

function revealPage() {
  if (!isActive.value || isLeaving.value)
    return
  isMaskHidden.value = true
  sakura.introEnded = true
  moveTimer = setTimeout(moveTitleToHero, MASK_FADE_DURATION + 80)
}

/**
 * 把每个单词量到 hero 标题里对应单词的位置（支持 hero 标题自动换行）。
 */
function measureHeroWordRects(target: HTMLElement) {
  const textNode = Array.from(target.childNodes).find(
    node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
  )
  if (!textNode)
    return []

  const text = textNode.textContent || ''
  let offset = 0
  return words.value.map((word) => {
    const start = text.indexOf(word, offset)
    if (start < 0)
      return null
    offset = start + word.length
    const range = document.createRange()
    range.setStart(textNode, start)
    range.setEnd(textNode, offset)
    return range.getBoundingClientRect()
  })
}

/**
 * 量取元素文本本身的字形矩形（与 hero 侧 Range 测量保持一致）。
 */
function glyphRect(element: HTMLElement) {
  const node = element.firstChild
  if (!node || node.nodeType !== Node.TEXT_NODE)
    return null
  const range = document.createRange()
  range.selectNodeContents(node)
  return range.getBoundingClientRect()
}

/**
 * 等待 Web 字体加载完成，避免用回退字体测量落点、字体替换后标题再下坠一段。
 */
function waitForFonts() {
  if (fontsSettled || typeof document === 'undefined' || !document.fonts)
    return Promise.resolve()

  // 字体请求可能一直挂起，最多等 600ms，避免整个入场动画被卡住
  return Promise.race([
    document.fonts.ready,
    new Promise<void>(resolve => setTimeout(resolve, 600)),
  ]).then(() => {
    fontsSettled = true
  })
}

async function moveTitleToHero() {
  if (!isActive.value || isLeaving.value)
    return
  await waitForFonts()
  if (!isActive.value || isLeaving.value)
    return
  const target = document.querySelector<HTMLElement>('.sakura-hero-deco-word')
  const elements = wordEls.value
  if (target && elements.length) {
    const rects = measureHeroWordRects(target)
    elements.forEach((element, index) => {
      const to = rects[index]
      const fromBox = element.getBoundingClientRect()
      const fromGlyph = glyphRect(element)
      if (!to || !fromGlyph || !fromGlyph.width || !to.width)
        return
      const scale = to.width / fromGlyph.width
      element.style.transformOrigin = `${fromGlyph.left - fromBox.left}px ${fromGlyph.top - fromBox.top}px`
      element.style.transform = `translate(${to.left - fromGlyph.left}px, ${to.top - fromGlyph.top}px) scale(${scale})`
    })
  }
  moveTimer = setTimeout(finish, MOVE_DURATION + 80)
}

function typeTitle() {
  const characters = Array.from(title.value)
  if (!characters.length) {
    isTyped.value = true
    moveTimer = setTimeout(revealPage, 220)
    return
  }
  const delay = Math.max(28, Math.min(60, 900 / characters.length))
  let index = 0
  const step = () => {
    if (!isActive.value || isLeaving.value)
      return
    index += 1
    typedTitle.value = characters.slice(0, index).join('')
    if (index >= characters.length) {
      isTyped.value = true
      moveTimer = setTimeout(revealPage, 220)
      return
    }
    typeTimer = setTimeout(step, delay)
  }
  typeTimer = setTimeout(step, 420)
}

function createPetal(initial = true): Petal {
  return {
    x: Math.random() * window.innerWidth,
    y: initial ? Math.random() * window.innerHeight : -40,
    scale: 0.3 + Math.random() * 0.7,
    alpha: 0.5 + Math.random() * 0.45,
    rotation: Math.random() * Math.PI * 2,
    drift: -1.95 + Math.random() * 0.55,
    fall: 1.4 + Math.random() * 1.2,
    spin: Math.random() * 0.03,
  }
}

function resetPetal(petal: Petal) {
  const fromTop = Math.random() > 0.4
  petal.x = fromTop ? Math.random() * window.innerWidth : window.innerWidth + 40
  petal.y = fromTop ? -40 : Math.random() * window.innerHeight
  petal.scale = 0.3 + Math.random() * 0.7
  petal.alpha = 0.5 + Math.random() * 0.45
  petal.rotation = Math.random() * Math.PI * 2
  petal.drift = -1.95 + Math.random() * 0.55
  petal.fall = 1.4 + Math.random() * 1.2
  petal.spin = Math.random() * 0.03
}

function startPetals() {
  const canvas = petalCanvas.value
  if (!canvas || petalLoopActive)
    return

  const context = canvas.getContext('2d')
  if (!context)
    return

  petalLoopActive = true

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  resize()
  window.addEventListener('resize', resize)
  petalResizeHandler = resize

  const image = new Image()
  image.src = petalUrl
  const petals = Array.from({ length: PETAL_COUNT }, () => createPetal())
  let started = false

  const draw = () => {
    if (!petalLoopActive)
      return

    context.clearRect(0, 0, window.innerWidth, window.innerHeight)

    for (const petal of petals) {
      petal.x += petal.drift
      petal.y += petal.fall
      petal.rotation += petal.spin

      if (petal.x < -60 || petal.y > window.innerHeight + 60)
        resetPetal(petal)

      const size = 40 * petal.scale
      context.save()
      context.globalAlpha = petal.alpha
      context.translate(petal.x, petal.y)
      context.rotate(petal.rotation)
      context.drawImage(image, -size / 2, -size / 2, size, size)
      context.restore()
    }

    petalFrameId = requestAnimationFrame(draw)
  }

  const begin = () => {
    if (started || !petalLoopActive)
      return
    started = true
    draw()
  }

  if (image.complete)
    begin()
  else
    image.onload = begin
}

function stopPetals() {
  petalLoopActive = false
  if (petalFrameId !== undefined)
    cancelAnimationFrame(petalFrameId)
  petalFrameId = undefined
  if (petalResizeHandler) {
    window.removeEventListener('resize', petalResizeHandler)
    petalResizeHandler = undefined
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    finish()
  }
}

function finish() {
  if (isLeaving.value)
    return
  isLeaving.value = true
  sakura.introEnded = true
  sakura.introTransitioning = false
  clearTimeout(finishTimer)
  clearTimeout(typeTimer)
  clearTimeout(moveTimer)
  window.removeEventListener('keydown', onKeydown)
  document.documentElement.style.overflow = previousOverflow
  removeTimer = setTimeout(() => {
    stopPetals()
    isActive.value = false
  }, LEAVE_DURATION)
}

onMounted(async () => {
  sakura.introEnded = false

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sakura.introEnded = true
    return
  }

  try {
    if (sessionStorage.getItem(STORAGE_KEY)) {
      sakura.introEnded = true
      return
    }
    sessionStorage.setItem(STORAGE_KEY, '1')
  }
  catch {
    // sessionStorage can be unavailable in private modes
  }

  isActive.value = true
  sakura.introTransitioning = true
  previousOverflow = document.documentElement.style.overflow
  document.documentElement.style.overflow = 'hidden'
  window.addEventListener('keydown', onKeydown)
  finishTimer = setTimeout(finish, PLAY_DURATION)

  await nextTick()
  startPetals()
  typeTitle()
})

onBeforeUnmount(() => {
  clearTimeout(finishTimer)
  clearTimeout(removeTimer)
  clearTimeout(typeTimer)
  clearTimeout(moveTimer)
  window.removeEventListener('keydown', onKeydown)
  stopPetals()
  if (isActive.value) {
    sakura.introEnded = true
    sakura.introTransitioning = false
    document.documentElement.style.overflow = previousOverflow
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isActive"
      class="sakura-intro"
      :class="{ 'is-leaving': isLeaving, 'is-mask-hidden': isMaskHidden }"
      aria-hidden="true"
      @click="finish"
      @wheel.stop.prevent
      @touchmove.stop.prevent
    >
      <div class="sakura-intro__backdrop">
        <div class="sakura-intro__bg" :style="backgroundStyle" />
        <video
          v-if="isCurrentVideo"
          class="sakura-intro__bg sakura-intro__bg--video"
          :src="currentMediaUrl"
          autoplay
          muted
          loop
          playsinline
        />
        <div class="sakura-intro__tint" />
        <canvas ref="petalCanvas" class="sakura-intro__petals" />
      </div>

      <div class="sakura-intro__content">
        <h1 v-if="title" class="sakura-intro__title">
          <span class="sakura-intro__title-text" :class="{ 'is-typed': isTyped }">
            <template v-if="isTyped">
              <span
                v-for="(word, index) in words"
                :key="index"
                ref="wordEls"
                class="sakura-intro__title-word"
              >{{ word }}</span>
            </template>
            <template v-else>
              <span class="sakura-intro__title-typed">{{ typedTitle }}</span>
              <span class="sakura-intro__title-ghost" aria-hidden="true">{{ restTitle }}</span>
            </template>
          </span>
        </h1>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.sakura-intro {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  overflow: hidden;
  cursor: pointer;
  isolation: isolate;
  transition: opacity 0.8s ease;

  &.is-leaving {
    pointer-events: none;
    opacity: 0;
  }

  &.is-mask-hidden {
    pointer-events: none;
  }

  &__backdrop {
    position: absolute;
    inset: 0;
    background: oklch(18% 0.01 280);
    transition: opacity 0.8s ease;
  }

  &.is-mask-hidden &__backdrop {
    opacity: 0;
  }

  &__bg {
    position: absolute;
    inset: -48px;
    background-position: center;
    background-size: cover;
    filter: blur(26px) brightness(0.5) saturate(1.15);
    opacity: 0;
    transform: scale(1.06);
    animation: sakura-intro-bg-in 0.9s ease forwards;

    &--video {
      width: calc(100% + 96px);
      height: calc(100% + 96px);
      object-fit: cover;
      pointer-events: none;
    }
  }

  &__tint {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      oklch(86% 0.09 345 / 22%) 0%,
      transparent 40%,
      oklch(86% 0.09 345 / 18%) 70%,
      transparent 100%
    );
  }

  &__petals {
    position: absolute;
    inset: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  &__content {
    position: relative;
    z-index: 1;
    padding: 0 8vw;
    text-align: center;
  }

  &__title {
    margin: 0;
    font-size: var(--sakura-hero-title-size, clamp(72px, 13vw, 220px));
    font-weight: 900;
    line-height: 0.9;
    color: var(--sakura-color-background, white);
    letter-spacing: -0.04em;
    animation: sakura-intro-title-appear 0.6s ease both;
  }

  &__title-text {
    position: relative;
    display: inline-block;
    white-space: pre-line;
    text-align: left;
    transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
    will-change: transform;
  }

  &__title-ghost {
    visibility: hidden;
  }

  &__title-word {
    display: inline-block;
    white-space: pre;
    will-change: transform;
    transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);

    & + & {
      margin-left: 0.26em;
    }
  }

  &__title-typed::after {
    content: '';
    display: inline-block;
    width: 0.08em;
    height: 0.9em;
    margin-left: 0.06em;
    vertical-align: -0.06em;
    background: currentcolor;
    animation: sakura-intro-caret 0.8s step-end infinite;
  }

  &__title-text.is-typed &__title-typed::after {
    display: none;
  }
}

@keyframes sakura-intro-bg-in {
  to {
    opacity: 1;
  }
}

@keyframes sakura-intro-title-appear {
  from {
    opacity: 0;
    transform: scale(0.92);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes sakura-intro-caret {
  50% {
    opacity: 0;
  }
}
</style>

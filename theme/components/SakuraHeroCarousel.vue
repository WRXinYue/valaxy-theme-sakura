<script lang="ts" setup>
import type { Options } from 'motion-v'
import { motion } from 'motion-v'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNavigate, useThemeConfig } from '../composables'
import { useSakuraAppStore } from '../stores'

const STACK_VISIBLE = 3
const EXPAND_DELAY = 120
const COLLAPSE_DELAY = 1200
const RIFT_DELAY = 1200
const RIFT_DURATION = 1000
const UNFURL_DURATION = 700

const themeConfig = useThemeConfig()
const navigate = useNavigate()
const sakura = useSakuraAppStore()

const entries = computed(() => themeConfig.value.pinnedPost?.entries || [])
const activeIndex = ref(0)
const isHovered = ref(false)
const isExpanded = ref(false)
const isEntering = ref(false)
const isDealing = ref(false)
const isConcealed = ref(false)
const isUnfurling = ref(false)
const leavingIndex = ref(-1)
const boostIndex = ref(-1)

const visibleStack = computed(() => Math.min(entries.value.length, STACK_VISIBLE))

// 遮罩撤下前将顶卡放在落点下方，延迟结束后轻轻上移并显现。
const riftStart = { opacity: 0, y: 8 }
const riftRest = { opacity: 1, y: 0 }
const riftAnimate = computed(() => sakura.introTransitioning ? riftStart : riftRest)

const riftTransition = computed<Options['transition']>(() => isEntering.value && !sakura.introTransitioning
  ? {
      duration: RIFT_DURATION / 1000,
      delay: RIFT_DELAY / 1000,
      ease: [0.32, 0, 0.22, 1],
    }
  : { duration: 0 })

let timer: ReturnType<typeof setInterval> | undefined
let expandTimer: ReturnType<typeof setTimeout> | undefined
let collapseTimer: ReturnType<typeof setTimeout> | undefined
let entranceTimer: ReturnType<typeof setTimeout> | undefined
let unfurlTimer: ReturnType<typeof setTimeout> | undefined
let unfurlEndTimer: ReturnType<typeof setTimeout> | undefined
let dealTimer: ReturnType<typeof setTimeout> | undefined
let boostTimer: ReturnType<typeof setTimeout> | undefined
let sawIntro = false

function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = undefined
  }
}

function startTimer() {
  stopTimer()
  if (entries.value.length <= 1 || isHovered.value || isEntering.value || isUnfurling.value)
    return
  timer = setInterval(nextSlide, 4200)
}

function nextSlide() {
  const total = entries.value.length
  if (total <= 1)
    return
  leavingIndex.value = activeIndex.value
  activeIndex.value = (activeIndex.value + 1) % total
  startDeal()
}

function selectSlide(index: number) {
  if (index === activeIndex.value)
    return
  leavingIndex.value = activeIndex.value
  activeIndex.value = index
  startDeal()
  startTimer()
}

/**
 * 轮换时把旧顶卡保持在最上层并淡出，等它完全透明后再降到最底层，
 * 避免硬切，也避免多张卡同时改 z-index 造成的层叠错乱。
 */
function startDeal() {
  if (entries.value.length <= 1 || isExpanded.value) {
    leavingIndex.value = -1
    boostIndex.value = -1
    return
  }
  isDealing.value = true
  boostIndex.value = leavingIndex.value
  clearTimeout(dealTimer)
  clearTimeout(boostTimer)
  // 旧卡快速淡出后立即降层，让下面的卡片第一时间顶上来
  boostTimer = setTimeout(() => {
    boostIndex.value = -1
  }, 300)
  dealTimer = setTimeout(() => {
    isDealing.value = false
    leavingIndex.value = -1
  }, 520)
}

/** 当前卡片在叠放中的层数：0 为最上面一张。 */
function depthOf(index: number) {
  const total = entries.value.length
  if (!total)
    return 0
  return (index - activeIndex.value + total) % total
}

/** 是否是正在退场的旧顶卡。 */
function isLeaving(index: number) {
  return isDealing.value && index === leavingIndex.value
}

interface CardTilt {
  rx: number
  ry: number
  sx: number
  sy: number
}

/*
 * 直接写 DOM style，不走 Vue 响应式：鼠标移动每帧都 setState 会触发布局与重渲染，
 * 再加上较长的 transition，就会有一卡一卡的感觉。
 */
const tiltTargets = new Map<number, CardTilt>()
const tiltFrames = new Map<number, number>()

function surfaceOf(element: HTMLElement) {
  return element.querySelector<HTMLElement>('.sakura-hero-carousel-surface')
}

function applyTilt(element: HTMLElement, index: number) {
  const surface = surfaceOf(element)
  const tilt = tiltTargets.get(index)
  if (!surface || !tilt)
    return
  surface.style.transitionDuration = ''
  surface.style.transform = `perspective(760px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg)`
  surface.style.setProperty('--sakura-carousel-shine-x', `${tilt.sx.toFixed(1)}%`)
  surface.style.setProperty('--sakura-carousel-shine-y', `${tilt.sy.toFixed(1)}%`)
  surface.classList.add('is-tilting')
}

/** 悬停时跟随指针做 3D 倾斜，并让高光跟着走。 */
function onSlideMove(event: MouseEvent, index: number) {
  const el = event.currentTarget as HTMLElement | null
  if (!el)
    return
  const rect = el.getBoundingClientRect()
  if (!rect.width || !rect.height)
    return
  const px = (event.clientX - rect.left) / rect.width
  const py = (event.clientY - rect.top) / rect.height
  tiltTargets.set(index, {
    rx: (0.5 - py) * 9,
    ry: (px - 0.5) * 11,
    sx: px * 100,
    sy: py * 100,
  })
  if (tiltFrames.has(index))
    return
  tiltFrames.set(index, requestAnimationFrame(() => {
    tiltFrames.delete(index)
    applyTilt(el, index)
  }))
}

function resetTilt(element: HTMLElement | null) {
  const surface = element && surfaceOf(element)
  if (!surface)
    return
  surface.style.transitionDuration = '0.4s'
  surface.style.transform = ''
  surface.classList.remove('is-tilting')
}

function onSlideLeave(event: MouseEvent, index: number) {
  const frame = tiltFrames.get(index)
  if (frame !== undefined) {
    cancelAnimationFrame(frame)
    tiltFrames.delete(index)
  }
  tiltTargets.delete(index)
  resetTilt(event.currentTarget as HTMLElement | null)
}

/** 根节点移出时兜底，避免卡片移动导致个别卡片残留倾斜。 */
function resetAllTilts() {
  for (const frame of tiltFrames.values())
    cancelAnimationFrame(frame)
  tiltFrames.clear()
  tiltTargets.clear()
  document.querySelectorAll<HTMLElement>('.sakura-hero-carousel-surface').forEach(resetTilt)
}

function stackStyle(index: number) {
  const depth = depthOf(index)
  return {
    '--sakura-carousel-depth': Math.min(depth, STACK_VISIBLE - 1),
    '--sakura-carousel-row': depth,
    'z-index': index === boostIndex.value ? 50 : entries.value.length - depth,
  }
}

function onEnter() {
  isHovered.value = true
  stopTimer()
  clearTimeout(collapseTimer)
  clearTimeout(expandTimer)
  clearTimeout(dealTimer)
  clearTimeout(boostTimer)
  isDealing.value = false
  leavingIndex.value = -1
  boostIndex.value = -1
  expandTimer = setTimeout(() => {
    isExpanded.value = true
  }, EXPAND_DELAY)
}

function onLeave() {
  isHovered.value = false
  clearTimeout(expandTimer)
  clearTimeout(collapseTimer)
  resetAllTilts()
  collapseTimer = setTimeout(() => {
    isExpanded.value = false
  }, COLLAPSE_DELAY)
  startTimer()
}

/**
 * 首屏 intro 结束后最后登场：
 * 顶卡淡入落位后，后两张再从它背后展开。
 */
watch(() => sakura.introTransitioning, (transitioning) => {
  if (transitioning) {
    sawIntro = true
    return
  }
  if (!sawIntro)
    return
  isEntering.value = true
  isConcealed.value = true
  stopTimer()
  clearTimeout(entranceTimer)
  clearTimeout(unfurlTimer)
  clearTimeout(unfurlEndTimer)
  entranceTimer = setTimeout(() => {
    isEntering.value = false
  }, RIFT_DELAY + RIFT_DURATION + UNFURL_DURATION)
  unfurlTimer = setTimeout(() => {
    isConcealed.value = false
    isUnfurling.value = true
    unfurlEndTimer = setTimeout(() => {
      isUnfurling.value = false
      startTimer()
    }, UNFURL_DURATION + 200)
  }, RIFT_DELAY + RIFT_DURATION)
}, { immediate: true })

onMounted(startTimer)

onBeforeUnmount(() => {
  stopTimer()
  clearTimeout(expandTimer)
  clearTimeout(collapseTimer)
  clearTimeout(entranceTimer)
  clearTimeout(unfurlTimer)
  clearTimeout(unfurlEndTimer)
  clearTimeout(dealTimer)
  clearTimeout(boostTimer)
})
</script>

<template>
  <motion.div
    v-if="entries.length"
    class="sakura-hero-carousel"
    :class="{
      'is-expanded': isExpanded,
      'is-dealing': isDealing,
      'is-concealed': isConcealed,
      'is-unfurling': isUnfurling,
    }"
    :style="{ '--sakura-carousel-count': entries.length, '--sakura-carousel-visible': visibleStack }"
    :initial="false"
    :animate="riftAnimate"
    :transition="riftTransition"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <a
      v-for="(entry, i) in entries"
      :key="i"
      class="sakura-hero-carousel-slide"
      :class="{ 'is-active': i === activeIndex, 'is-leaving': isLeaving(i) }"
      :style="stackStyle(i)"
      :data-depth="Math.min(depthOf(i), STACK_VISIBLE - 1)"
      :href="entry.link"
      :aria-hidden="!isExpanded && i !== activeIndex"
      :tabindex="isExpanded || i === activeIndex ? 0 : -1"
      @click.prevent="navigate.to(entry.link || '')"
      @mousemove="onSlideMove($event, i)"
      @mouseleave="onSlideLeave($event, i)"
    >
      <span class="sakura-hero-carousel-surface">
        <img class="sakura-hero-carousel-img" :src="entry.img" :alt="entry.title" loading="lazy">
        <span class="sakura-hero-carousel-shade" aria-hidden="true" />
        <span class="sakura-hero-carousel-text">
          <span class="sakura-hero-carousel-title">{{ entry.title }}</span>
          <span v-if="entry.desc" class="sakura-hero-carousel-desc">{{ entry.desc }}</span>
        </span>
        <span class="sakura-hero-carousel-arrow" aria-hidden="true" />
        <span class="sakura-hero-carousel-shine" aria-hidden="true" />
      </span>
    </a>

    <div v-if="entries.length > 1" class="sakura-hero-carousel-dots">
      <button
        v-for="(entry, i) in entries"
        :key="i"
        class="sakura-hero-carousel-dot"
        :class="{ 'is-active': i === activeIndex }"
        type="button"
        :aria-label="entry.title"
        @mouseenter="selectSlide(i)"
        @click.stop="selectSlide(i)"
      />
    </div>
  </motion.div>
</template>

<style lang="scss" scoped>
.sakura-hero-carousel {
  --sakura-carousel-w: clamp(200px, 19vw, 272px);
  --sakura-carousel-card-h: calc(var(--sakura-carousel-w) * 9 / 16);
  --sakura-carousel-gap: 8px;
  --sakura-carousel-row-h: calc(var(--sakura-carousel-card-h) + var(--sakura-carousel-gap));
  --sakura-carousel-peek: 8px;
  --sakura-carousel-fan-x: 4px;
  --sakura-carousel-fan-rotate: 1.6deg;

  position: absolute;
  right: clamp(18px, 2vw, 26px);
  bottom: calc(var(--sakura-navbar-height, 64px) + 20px);

  /* 高于右侧导航（12）和 hero 边框（10），展开时卡片不被压住 */
  z-index: 14;
  width: var(--sakura-carousel-w);
  height: calc(var(--sakura-carousel-card-h) + (var(--sakura-carousel-visible, 1) - 1) * var(--sakura-carousel-peek));
  border-radius: 16px;
  transform-origin: left center;
  transition: height 0.6s cubic-bezier(0.22, 1, 0.3, 1);

  &.is-expanded {
    height: calc(var(--sakura-carousel-count) * var(--sakura-carousel-row-h) - var(--sakura-carousel-gap));
  }

  @media (width <= 768px) {
    display: none;
  }
}

.sakura-hero-carousel-slide {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: var(--sakura-carousel-card-h);

  --sakura-carousel-delay: calc(var(--sakura-carousel-depth, 0) * 70ms);

  transform-origin: top center;
  transform: translate(
      calc(var(--sakura-carousel-depth, 0) * var(--sakura-carousel-fan-x)),
      calc(var(--sakura-carousel-depth, 0) * var(--sakura-carousel-peek) * -1)
    )
    rotate(calc(var(--sakura-carousel-depth, 0) * var(--sakura-carousel-fan-rotate)))
    scale(calc(1 - var(--sakura-carousel-depth, 0) * 0.02));
  transition:
    transform 0.6s cubic-bezier(0.22, 1.12, 0.36, 1) var(--sakura-carousel-delay),
    opacity 0.45s ease var(--sakura-carousel-delay);
  will-change: transform;
}

.sakura-hero-carousel.is-expanded .sakura-hero-carousel-slide {
  /*
   * 先让最上面的卡片移出去，再依次展开下面的卡片，
   * 避免两张卡片在同一段路径上互相穿过。
   */
  --sakura-carousel-delay: calc((var(--sakura-carousel-count, 1) - 1 - var(--sakura-carousel-row, 0)) * 165ms);

  transform: translateY(calc(var(--sakura-carousel-row, 0) * var(--sakura-carousel-row-h) * -1)) rotate(0deg) scale(1);
}

/* 入场时先只露出顶卡，其余卡片等顶卡落位后再展开 */
.sakura-hero-carousel.is-concealed .sakura-hero-carousel-slide:not(.is-active) {
  opacity: 0;
  transition: none;
}

.sakura-hero-carousel.is-unfurling .sakura-hero-carousel-slide[data-depth='1'] {
  animation: sakura-carousel-unfurl-1 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.06s both;
}

.sakura-hero-carousel.is-unfurling .sakura-hero-carousel-slide[data-depth='2'] {
  animation: sakura-carousel-unfurl-2 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both;
}

/* 从顶卡所在位置（完全重合）展开到自己的叠放位 */
@keyframes sakura-carousel-unfurl-1 {
  0% {
    opacity: 0;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }

  55% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    transform: translate(var(--sakura-carousel-fan-x), calc(var(--sakura-carousel-peek) * -1))
      rotate(var(--sakura-carousel-fan-rotate)) scale(0.98);
  }
}

@keyframes sakura-carousel-unfurl-2 {
  0% {
    opacity: 0;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }

  55% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    transform: translate(calc(var(--sakura-carousel-fan-x) * 2), calc(var(--sakura-carousel-peek) * -2))
      rotate(calc(var(--sakura-carousel-fan-rotate) * 2)) scale(0.96);
  }
}

/*
 * 轮换：旧顶卡快速淡出并降层，新顶卡同时从略低的位置顶上来，
 * 两条动画在 520ms 内一起结束，避免“上面消失了、下面才开始出现”。
 */
.sakura-hero-carousel.is-dealing .sakura-hero-carousel-slide.is-leaving {
  animation: sakura-carousel-deal 0.52s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.sakura-hero-carousel.is-dealing:not(.is-expanded) .sakura-hero-carousel-slide.is-active {
  animation: sakura-carousel-arrive 0.52s cubic-bezier(0.22, 1.12, 0.36, 1) both;
}

@keyframes sakura-carousel-deal {
  0%,
  10% {
    opacity: 1;
  }

  /* 不彻底消失，留一点底，避免“先没再出现”的断裂感 */
  50%,
  60% {
    opacity: 0.06;
  }

  100% {
    opacity: 1;
  }
}

@keyframes sakura-carousel-arrive {
  0% {
    opacity: 0.55;
    transform: translateY(-10px) rotate(1.4deg) scale(0.95);
  }

  100% {
    opacity: 1;
    transform: none;
  }
}

.sakura-hero-carousel-surface {
  position: absolute;
  inset: 0;
  display: block;
  overflow: hidden;
  background: oklch(0% 0 0 / 35%);
  border: 1px solid oklch(100% 0 0 / 16%);
  border-radius: 14px;
  box-shadow: 0 18px 40px -22px oklch(0% 0 0 / 70%);
  transform-origin: center;
  transition:
    transform 0.14s ease-out,
    border-color 0.2s ease;

  &::after {
    position: absolute;
    inset: 0;
    pointer-events: none;
    content: '';
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px oklch(100% 0 0 / 6%);
  }

  @media (hover: hover) {
    &:hover {
      border-color: oklch(100% 0 0 / 34%);
    }
  }
}

.sakura-hero-carousel-shine {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at var(--sakura-carousel-shine-x, 50%) var(--sakura-carousel-shine-y, 50%),
    oklch(100% 0 0 / 28%),
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sakura-hero-carousel-surface.is-tilting .sakura-hero-carousel-shine {
  opacity: 1;
}

.sakura-hero-carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sakura-hero-carousel-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, oklch(10% 0.02 280 / 88%) 0%, oklch(10% 0.02 280 / 28%) 46%, transparent 76%);
}

/* 叠在下面的卡片压暗：用叠加暗层而不是 filter，3D 变换下 filter 容易出现割裂 */
.sakura-hero-carousel:not(.is-expanded) .sakura-hero-carousel-slide:not(.is-active) .sakura-hero-carousel-shade {
  background:
    linear-gradient(oklch(0% 0 0 / 46%), oklch(0% 0 0 / 46%)),
    linear-gradient(to top, oklch(10% 0.02 280 / 88%) 0%, oklch(10% 0.02 280 / 28%) 46%, transparent 76%);
}

.sakura-hero-carousel:not(.is-expanded) .sakura-hero-carousel-slide:not(.is-active) .sakura-hero-carousel-surface {
  box-shadow:
    0 18px 40px -22px oklch(0% 0 0 / 70%),
    inset 0 0 0 1px oklch(100% 0 0 / 30%);
}

.sakura-hero-carousel-text {
  position: absolute;
  right: 52px;
  bottom: 11px;
  left: 13px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  color: oklch(100% 0 0 / 94%);
}

.sakura-hero-carousel-title {
  overflow: hidden;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.sakura-hero-carousel-desc {
  overflow: hidden;
  font-size: 10px;
  opacity: 0.72;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.sakura-hero-carousel-arrow {
  position: absolute;
  top: 9px;
  right: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  color: oklch(100% 0 0 / 92%);
  background: oklch(100% 0 0 / 16%);
  border-radius: 50%;
  backdrop-filter: blur(8px);

  &::before {
    width: 7px;
    height: 7px;
    content: '';
    border-top: 1.5px solid currentcolor;
    border-right: 1.5px solid currentcolor;
    transform: rotate(45deg) translate(-1px, 1px);
  }
}

.sakura-hero-carousel-dots {
  position: absolute;
  right: 11px;
  bottom: 11px;
  z-index: 30;
  display: flex;
  gap: 5px;
}

.sakura-hero-carousel-dot {
  width: 5px;
  height: 5px;
  padding: 0;
  cursor: pointer;
  background: oklch(100% 0 0 / 40%);
  border: 0;
  border-radius: 999px;
  transition:
    width 0.3s ease,
    background 0.3s ease;

  &.is-active {
    width: 15px;
    background: oklch(100% 0 0 / 95%);
  }
}
</style>

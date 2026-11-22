<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useThemeConfig } from '../composables'
import { useSakuraAppStore } from '../stores'

const props = defineProps<{
  icon?: string
  message?: string
}>()

const MARQUEE_GAP = 48
const MARQUEE_SPEED = 45

const themeConfig = useThemeConfig()
const sakura = useSakuraAppStore()

const noticeMessage = computed(() => props.message || themeConfig.value.notice?.message)
const icon = computed(() => props.icon || themeConfig.value.ui.notice?.icon)

const messageEl = ref<HTMLElement | null>(null)
const messageTextEl = ref<HTMLElement | null>(null)
const messageTrackEl = ref<HTMLElement | null>(null)
const isMarquee = ref(false)
const isExpanded = ref(false)
const isHoveringMarquee = ref(false)
const isSettling = ref(false)
const isSettled = ref(false)
const marqueeShift = ref('0px')
const marqueeDuration = ref('10s')
const marqueeDistance = ref(0)

let resizeObserver: ResizeObserver | undefined
let expandTimer: ReturnType<typeof setTimeout> | undefined
let measureTimer: ReturnType<typeof setTimeout> | undefined
let settleTimer: ReturnType<typeof setTimeout> | undefined
let settleFrame: number | undefined

/**
 * 悬停结束后不要直接重置动画（会从当前位置跳回开头再重播一遍），
 * 先记住当前位移，再缓慢归位到起点。
 */
function onMarqueeEnter() {
  if (!isMarquee.value)
    return
  clearTimeout(settleTimer)
  if (settleFrame !== undefined)
    cancelAnimationFrame(settleFrame)
  settleFrame = undefined

  const track = messageTrackEl.value
  if (track) {
    // 归位途中重新悬停：用负 delay 从当前进度继续，而不是跳回开头
    if (isSettling.value) {
      const matrix = new DOMMatrixReadOnly(getComputedStyle(track).transform)
      const shift = Number.isFinite(matrix.m41) ? matrix.m41 : 0
      const seconds = Number.parseFloat(marqueeDuration.value) || 10
      const distance = marqueeDistance.value
      if (distance > 0 && shift < 0)
        track.style.animationDelay = `${(-shift / distance * seconds).toFixed(2)}s`
    }
    else {
      track.style.animationDelay = ''
    }
  }

  isSettling.value = false
  isSettled.value = false
  isHoveringMarquee.value = true
}

function onMarqueeLeave() {
  if (!isMarquee.value)
    return
  isHoveringMarquee.value = false
  const track = messageTrackEl.value
  if (!track)
    return

  const matrix = new DOMMatrixReadOnly(getComputedStyle(track).transform)
  const shift = Number.isFinite(matrix.m41) ? matrix.m41 : 0
  track.style.animationDelay = ''
  track.style.setProperty('--sakura-notice-settle', `${shift}px`)
  isSettling.value = true

  // 先冻结在当前位置，下一帧再过渡回起点
  settleFrame = requestAnimationFrame(() => {
    track.style.setProperty('--sakura-notice-settle', '0px')
  })

  clearTimeout(settleTimer)
  settleTimer = setTimeout(() => {
    isSettling.value = false
    isSettled.value = true
  }, 1500)
}

function scheduleMeasure(delay: number) {
  clearTimeout(measureTimer)
  measureTimer = setTimeout(measureOverflow, delay)
}

function measureOverflow() {
  if (!isExpanded.value)
    return

  const container = messageEl.value
  const text = messageTextEl.value
  if (!container || !text)
    return

  const width = text.scrollWidth
  const overflowing = width > container.clientWidth + 1
  isMarquee.value = overflowing

  if (!overflowing) {
    isHoveringMarquee.value = false
    isSettling.value = false
    isSettled.value = false
  }

  if (overflowing) {
    const distance = width + MARQUEE_GAP
    marqueeDistance.value = distance
    marqueeShift.value = `-${distance}px`
    marqueeDuration.value = `${Math.max(6, distance / MARQUEE_SPEED).toFixed(1)}s`
  }
}

function scheduleExpand() {
  if (sakura.introTransitioning)
    return
  clearTimeout(expandTimer)
  expandTimer = setTimeout(() => {
    isExpanded.value = true
    // 等胶囊宽度过渡结束再判断是否真的溢出，避免展开中途误判
    scheduleMeasure(700)
  }, 260)
}

onMounted(async () => {
  await nextTick()
  scheduleExpand()
  if (typeof ResizeObserver !== 'undefined' && messageEl.value) {
    resizeObserver = new ResizeObserver(() => scheduleMeasure(180))
    resizeObserver.observe(messageEl.value)
  }
})

onBeforeUnmount(() => {
  clearTimeout(expandTimer)
  clearTimeout(measureTimer)
  clearTimeout(settleTimer)
  if (settleFrame !== undefined)
    cancelAnimationFrame(settleFrame)
  settleFrame = undefined
  resizeObserver?.disconnect()
  resizeObserver = undefined
})

watch(noticeMessage, () => nextTick(() => scheduleMeasure(60)))

watch(() => sakura.introTransitioning, (value) => {
  if (!value)
    scheduleExpand()
})
</script>

<template>
  <div v-if="noticeMessage" class="sakura-notice" :class="{ 'is-expanded': isExpanded }" role="note">
    <span :class="icon" class="sakura-notice-icon" aria-hidden="true" />
    <div
      ref="messageEl"
      class="sakura-notice-message"
      :class="{
        'is-marquee': isMarquee,
        'is-hovering': isHoveringMarquee,
        'is-settling': isSettling,
        'is-settled': isSettled,
      }"
      :style="{ '--sakura-notice-marquee-shift': marqueeShift, '--sakura-notice-marquee-duration': marqueeDuration }"
      @mouseenter="onMarqueeEnter"
      @mouseleave="onMarqueeLeave"
    >
      <div ref="messageTrackEl" class="sakura-notice-message-track">
        <span ref="messageTextEl" class="sakura-notice-message-text" v-html="noticeMessage" />
        <span v-if="isMarquee" class="sakura-notice-message-text sakura-notice-message-copy" aria-hidden="true" v-html="noticeMessage" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sakura-notice-icon {
  flex: 0 0 auto;
  font-size: 13px;
  color: inherit;
  opacity: 0;
  transform: scale(0.4);
  transition:
    opacity 0.35s ease,
    transform 0.35s cubic-bezier(0.19, 1, 0.22, 1);
}

.sakura-notice.is-expanded .sakura-notice-icon {
  opacity: 1;
  transform: none;
  transition-delay: 0.16s;
}

.sakura-notice {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 46px;
  max-width: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: 999px;
  background: var(--sakura-navbar-bg);
  backdrop-filter: blur(10px);
  color: var(--sakura-color-text);
  font-size: 14px;
  line-height: 1.4;
  opacity: 0;
  transform: scale(0.6);
  transform-origin: center;
  transition:
    max-width 0.65s cubic-bezier(0.32, 0.72, 0, 1),
    padding 0.65s cubic-bezier(0.32, 0.72, 0, 1),
    opacity 0.3s ease,
    transform 0.65s cubic-bezier(0.32, 0.72, 0, 1),
    border-color 0.25s ease;

  &.is-expanded {
    max-width: min(640px, calc(100vw - 32px));
    padding: 0 16px;
    border-color: var(--sakura-navbar-bg);
    opacity: 1;
    transform: none;
  }

  &:hover {
    border-color: var(--sakura-color-primary);
  }
}

.sakura-notice-message {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateX(8px);
  transition:
    opacity 0.4s ease,
    transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.sakura-notice.is-expanded .sakura-notice-message {
  opacity: 1;
  transform: none;
  transition-delay: 0.14s;
}

.sakura-notice-message-track {
  display: flex;
  width: max-content;
  white-space: nowrap;
}

.sakura-notice-message.is-marquee .sakura-notice-message-track {
  animation: sakura-notice-marquee var(--sakura-notice-marquee-duration, 10s) linear both;
}

/*
 * 默认只跑一遍，避免长期滚动抢焦点；鼠标悬停时循环播放，方便回看。
 */
.sakura-notice-message.is-marquee.is-hovering .sakura-notice-message-track {
  animation-iteration-count: infinite;
}

/* 离开悬停：冻结当前位置再缓慢归位，避免动画重置导致文字来回跳 */
.sakura-notice-message.is-marquee.is-settling .sakura-notice-message-track {
  animation: none;
  transform: translateX(var(--sakura-notice-settle, 0));
  transition: transform 1.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.sakura-notice-message.is-marquee.is-settled .sakura-notice-message-track {
  animation: none;
  transform: none;
}

.sakura-notice-message-text {
  display: block;
}

.sakura-notice-message-copy {
  margin-left: 48px;
}

.sakura-notice-message :deep(a) {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--sakura-color-primary);
    text-decoration: underline;
  }
}

@keyframes sakura-notice-marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(var(--sakura-notice-marquee-shift, -100%));
  }
}
</style>

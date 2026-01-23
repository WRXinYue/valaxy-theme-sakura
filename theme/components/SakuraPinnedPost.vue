<script lang="ts" setup>
import type { PinnedPost } from '../types'
import { useMobile } from 'valaxy'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useNavigate, useThemeConfig } from '../composables'

const props = defineProps<Partial<PinnedPost & {
  icon: string
  desktopItems: number
  autoplay: boolean
  interval: number
}>>()

const themeConfig = useThemeConfig()
const navigate = useNavigate()
const isMobile = useMobile()

const icon = computed(() => props.icon ?? themeConfig.value.ui.pinnedPost?.icon)
const text = computed(() => props.text ?? themeConfig.value.pinnedPost?.text)
const entries = computed(() => props.entries ?? themeConfig.value.pinnedPost?.entries)
const imageCard = computed(() => themeConfig.value.ui.pinnedPost?.image)

const desktopItems = computed(() => {
  return props.desktopItems ?? themeConfig.value.pinnedPost?.desktopItems ?? 3
})

const isCarousel = computed(() => {
  if (isMobile.value)
    return true
  if (entries.value && entries.value.length > desktopItems.value)
    return true
  return false
})

const visibleItems = computed(() => isMobile.value ? 1 : desktopItems.value)
const maxIndex = computed(() => {
  if (!entries.value)
    return 0
  return Math.max(0, entries.value.length - visibleItems.value)
})

const direction = ref<'horizontal' | 'vertical'>('horizontal')

const carouselRef = ref<HTMLElement>()
const activeIndex = ref(0)

const autoplay = computed(() => props.autoplay ?? themeConfig.value.pinnedPost?.autoplay ?? false)
const autoplayInterval = computed(() => props.interval ?? themeConfig.value.pinnedPost?.interval ?? 3000)
let autoplayTimer: NodeJS.Timeout | null = null

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

function handleScroll() {
  if (!carouselRef.value || !entries.value)
    return
  const el = carouselRef.value
  const scrollLeft = el.scrollLeft
  const clientWidth = el.clientWidth
  const scrollWidth = el.scrollWidth

  if (scrollWidth - clientWidth - scrollLeft < 2) {
    activeIndex.value = maxIndex.value
    return
  }

  let closestIndex = 0
  let minDiff = Infinity

  const children = Array.from(el.children) as HTMLElement[]
  for (let i = 0; i < Math.min(children.length, entries.value.length); i++) {
    const child = children[i]
    const diff = Math.abs(child.offsetLeft - scrollLeft)
    if (diff < minDiff) {
      minDiff = diff
      closestIndex = i
    }
  }
  activeIndex.value = Math.min(closestIndex, maxIndex.value)
}

function scrollTo(index: number) {
  if (!carouselRef.value || !entries.value)
    return
  const el = carouselRef.value
  const children = Array.from(el.children) as HTMLElement[]
  const targetIndex = Math.min(index, maxIndex.value)

  if (targetIndex >= 0 && targetIndex < children.length) {
    const target = children[targetIndex]
    el.scrollTo({
      left: target.offsetLeft,
      behavior: 'smooth',
    })
  }
}

function startAutoplay() {
  if (!autoplay.value || !isCarousel.value || !entries.value)
    return
  stopAutoplay()
  autoplayTimer = setInterval(() => {
    if (!entries.value)
      return

    let nextIndex = activeIndex.value + 1
    if (nextIndex > maxIndex.value) {
      nextIndex = 0
    }

    scrollTo(nextIndex)
  }, autoplayInterval.value)
}

watch(activeIndex, () => {
  if (autoplay.value) {
    startAutoplay()
  }
})

watch([isCarousel, entries, autoplay], () => {
  if (isCarousel.value && autoplay.value && entries.value?.length) {
    startAutoplay()
  }
  else {
    stopAutoplay()
  }
})

onMounted(() => {
  if (carouselRef.value)
    carouselRef.value.addEventListener('scroll', handleScroll, { passive: true })
  startAutoplay()
})

onUnmounted(() => {
  if (carouselRef.value)
    carouselRef.value.removeEventListener('scroll', handleScroll)
  stopAutoplay()
})
</script>

<template>
  <div v-if="entries?.length" class="sakura-pinned-post">
    <SakuraDivider :icon :text />
    <div class="sakura-pinned-post-container" @mouseenter="stopAutoplay" @mouseleave="startAutoplay" @touchstart="stopAutoplay" @touchend="startAutoplay">
      <div
        ref="carouselRef"
        class="sakura-pinned-post-card flex"
        :class="[
          isCarousel ? 'is-carousel' : '',
          direction === 'vertical' ? 'is-vertical' : '',
        ]"
      >
        <SakuraImageCard
          v-for="(entry, i) in entries"
          :key="i" class="sakura-card" v-bind="imageCard" :data-title="entry.title"
          :to="entry.link" :data-desc="entry.desc" :overlay="true" :src="entry.img"
          :class="entry.link ? 'cursor-pointer' : ''" @click="navigate.to(entry.link || '')"
        />
      </div>

      <div v-if="isCarousel" class="sakura-dots">
        <span
          v-for="(_, i) in (maxIndex + 1)"
          :key="i"
          :class="{ active: i === activeIndex }"
          @click="scrollTo(i)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sakura-pinned-post {
  .sakura-pinned-post-container {
    position: relative;
  }

  .sakura-dots {
    position: absolute;
    bottom: 12px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 8px;
    z-index: 2;
    pointer-events: none;

    span {
      pointer-events: auto;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: oklch(100% 0 0 / 40%);
      transition: all 0.3s;
      cursor: pointer;
      box-shadow: 0 1px 2px oklch(0% 0 0 / 20%);

      &.active {
        background: white;
        width: 16px;
        border-radius: 4px;
      }

      &:hover {
        background: oklch(100% 0 0 / 80%);
      }
    }
  }

  .sakura-image-card {
    position: relative;
    flex: 1 0 200px;
    margin: 0;
    border-radius: var(--sakura-post-card-rd);
    overflow: hidden;
    scroll-snap-align: start;
    transition:
      flex 0.6s cubic-bezier(0.16, 1, 0.3, 1),
      width 0.6s cubic-bezier(0.16, 1, 0.3, 1);

    &::before,
    &::after {
      position: absolute;
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: oklch(100% 0 0);
      transition:
        right 0.35s ease,
        left 0.5s ease;
      z-index: 1;
    }

    &::before {
      content: attr(data-title);
      top: 30px;
      right: 100%;
      background-color: var(--sakura-color-overlay-background);
    }

    &::after {
      content: attr(data-desc);
      top: 70px;
      left: 100%;
      font-size: 12px;
    }

    &:hover {
      &::before {
        right: 0;
      }

      &::after {
        left: 0;
      }
    }
  }

  &-card {
    height: 160px;
    gap: 10px;

    &.is-carousel {
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }

      .sakura-image-card {
        $gap: 10px;

        /* stylelint-disable-next-line value-keyword-case */
        flex: 0 0 calc((100% - (v-bind(visibleItems) - 1) * $gap) / v-bind(visibleItems));
        /* stylelint-disable-next-line value-keyword-case */
        width: calc((100% - (v-bind(visibleItems) - 1) * $gap) / v-bind(visibleItems));
        scroll-snap-align: start;

        @media (width <= 768px) {
          flex: 0 0 100%;
          width: 100%;
        }
      }
    }

    &.is-vertical {
      flex-direction: column;
      overflow: hidden auto;
      scroll-snap-type: y mandatory;

      .sakura-image-card {
        height: 100%;
        width: 100%;
        flex: 0 0 100%;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ProgressiveImage } from 'vue-progressive-image'
import { useThemeConfig } from '../composables'
import { resolveImage } from '../utils'

const props = withDefaults(defineProps<{
  [key: string]: any
} & Partial<SakuraImageCardProps>>(), {
  scale: 1.2,
  rotate: 0,
  skewX: 0,
  skewY: 0,
  opacity: 1,
  translateX: 0,
  translateY: 0,
  transitionDuration: 'var(--va-transition-duration)',
  transitionTimingFunction: 'ease',
  overlay: false,
  overlayColor: 'rgba(0, 0, 0, 0.5)',
  overlayOpacity: 0.5,
  overlayOpacityInitial: 0,
})

export interface SakuraImageCardProps {
  src: string | string[]
  to: string
  alt: string
  errorImg: string | string[]
  scale: number | string
  rotate: number | string
  skewX: number | string
  skewY: number | string
  opacity: number | string
  translateX: number | string
  translateY: number | string
  transitionDuration: string
  transitionTimingFunction: string
  overlay: boolean
  overlayColor: string
  overlayOpacity: number | string
  overlayOpacityInitial: number | string
}

const themeConfig = useThemeConfig()

const isHovering = ref(false)
const showNotFondIcon = ref(false)

const defaultImg = computed(() => props.errorImg ? resolveImage(props.errorImg) : themeConfig.value?.notFoundImage)

const imageStyle = computed(() => {
  if (isHovering.value) {
    return {
      transform: `scale(${props.scale}) rotate(${props.rotate}deg) skew(${props.skewX}deg, ${props.skewY}deg) translate(${props.translateX}px, ${props.translateY}px)`,
      opacity: props.opacity,
      transition: `transform ${props.transitionDuration} ${props.transitionTimingFunction}, opacity ${props.transitionDuration} ${props.transitionTimingFunction}`,
    }
  }
  return { transition: `transform ${props.transitionDuration} ${props.transitionTimingFunction}, opacity ${props.transitionDuration} ${props.transitionTimingFunction}` }
})

const overlayStyle = computed(() => ({
  opacity: isHovering.value ? props.overlayOpacity : props.overlayOpacityInitial,
  backgroundColor: props.overlayColor,
}))

function onImgError(e: Event) {
  const targetEl = e.target as HTMLImageElement
  targetEl.setAttribute('data-src', targetEl.src)

  if (!defaultImg.value) {
    showNotFondIcon.value = true
    return
  }

  showNotFondIcon.value = false

  targetEl.src = defaultImg.value
}

const src = computed(() => {
  const img = props.src ? resolveImage(props.src) : ''

  return img && img.includes('?random') ? img.replace('?random', `?random=${Math.random()}`) : img
})
</script>

<template>
  <div class="sakura-image-card relative overflow-hidden" @mouseover="isHovering = true" @mouseleave="isHovering = false">
    <AppLink flex="~" w="full" h="full" :to="props.to || ''" aria-label="Go to Post" :class="{ 'cursor-default': !props.to }">
      <ClientOnly>
        <ProgressiveImage
          v-if="src" v-show="!showNotFondIcon" custom-class="sakura-image-card-img" lazy-placeholder
          :src :alt="props.alt || 'cover'" :style="imageStyle" @error="onImgError"
        />
      </ClientOnly>
      <div v-show="showNotFondIcon || !src" class="h-full w-full bg-$sakura-color-background opacity-70" :style="imageStyle" flex="~ center">
        <div i-fa6-solid-image w="30%" h="30%" />
      </div>
      <template v-if="overlay">
        <div class="sakura-image-card-overlay" :style="overlayStyle" />
      </template>
      <div v-if="$slots.default" class="absolute top-0 h-full w-full">
        <slot />
      </div>
    </AppLink>
  </div>
</template>

<style lang="scss" scoped>
.sakura-image-card {
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: opacity var(--va-transition-duration) ease;
  }
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onImgError } from '../../utils'
import noneImg from '../../assets/image-404.png'

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
  transitionDuration: '0.4s',
  transitionTimingFunction: 'ease',
  overlay: false,
  overlayColor: 'rgba(0, 0, 0, 0.5)',
  overlayOpacity: 0.5,
  overlayOpacityInitial: 0,
})

export interface SakuraImageCardProps {
  src: string
  to: string
  alt: string
  errorImg: string
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

const isHovering = ref(false)

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

function onError(e: Event) {
  onImgError(e, props.errorImg || noneImg)
}
</script>

<template>
  <div class="sakura-image-card relative overflow-hidden" @mouseover="isHovering = true" @mouseleave="isHovering = false">
    <AppLink :to="props.to || ''" aria-label="Go to Post" :class="{ 'cursor-default': !props.to }">
      <img class="h-full w-full object-cover" loading="lazy" :src="props.src || noneImg" :alt="props.alt || 'cover'" :style="imageStyle" @error="onError">
      <template v-if="overlay">
        <div class="overlay" :style="overlayStyle" />
      </template>
      <div v-if="$slots.default" class="absolute top-0 h-full w-full">
        <slot />
      </div>
    </AppLink>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: opacity 0.4s ease;
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import image404 from '../../assets/image-404.png'

const props = defineProps({
  src: String,
  to: String,
  scale: { type: [Number, String], default: 1.2 },
  rotate: { type: [Number, String], default: 0 },
  skewX: { type: [Number, String], default: 0 },
  skewY: { type: [Number, String], default: 0 },
  opacity: { type: [Number, String], default: 1 },
  translateX: { type: [Number, String], default: 0 },
  translateY: { type: [Number, String], default: 0 },
  transitionDuration: { type: String, default: '0.4s' },
  transitionTimingFunction: { type: String, default: 'ease' },
  overlay: { type: Boolean, default: false },
  overlayColor: { type: String, default: 'rgba(0, 0, 0, 0.5)' },
  overlayOpacity: { type: [Number, String], default: 0.5 },
  overlayOpacityInitial: { type: [Number, String], default: 0 },
})

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
</script>

<template>
  <div class="overflow-hidden relative" @mouseover="isHovering = true" @mouseleave="isHovering = false">
    <AppLink :to="props.to || ''" aria-label="Go to Post" :class="{ 'cursor-default': !props.to }">
      <img class="lazy object-cover h-full w-full" :src="props.src || image404" alt="cover" :style="imageStyle">
      <template v-if="overlay">
        <div class="overlay" :style="overlayStyle" />
      </template>
      <div class="absolute top-0 w-full h-full">
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

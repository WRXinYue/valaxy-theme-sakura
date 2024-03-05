<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  src: String,
  to: String,
  scale: { type: Number, default: 1.2 },
  rotate: { type: Number, default: 0 },
  skewX: { type: Number, default: 0 },
  skewY: { type: Number, default: 0 },
  opacity: { type: Number, default: 1 },
  translateX: { type: Number, default: 0 },
  translateY: { type: Number, default: 0 },
  transitionDuration: { type: String, default: '0.4s' },
  transitionTimingFunction: { type: String, default: 'ease' },
  overlay: { type: Boolean, default: false },
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
</script>

<template>
  <div class="overflow-hidden relative" @mouseover="isHovering = true" @mouseleave="isHovering = false">
    <RouterLink :to="props.to || ''" aria-label="Go to Post">
      <img class="lazy object-cover h-full w-full" :src="props.src" alt="cover" :style="imageStyle">
      <template v-if="overlay">
        <div class="overlay" :style="{ opacity: isHovering ? 1 : 0 }" />
      </template>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.4s ease;
}
</style>

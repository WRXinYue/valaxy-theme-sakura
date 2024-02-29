<script setup lang="ts">
import { isClient, useWindowScroll } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'
import LazyLoad from 'vanilla-lazyload'
import { useThemeConfig } from '../composables'
import { scrollToTop } from '../utils/scrollDamping'
import scrollImage from '../assets/scroll.png'

const themeConfig = useThemeConfig()
const { y } = useWindowScroll()
const hide = 'top: -900px'
const style = ref(hide)
const isVisible = ref(false)

function onScroll() {
  if (y.value > 200) {
    if (window.innerWidth > 720) {
      isVisible.value = false
      style.value = `top: ${Math.min(window.innerHeight - 968, 0)}px`
    }

    else {
      isVisible.value = true
      style.value = `top: -640px`
    }
  }
  else {
    style.value = hide
  }
}
function toTop() {
  if (isClient)
    return

  if (!themeConfig.value.scrollDamping?.dampingType)
    window.scrollTo({ top: 0 })
  else
    scrollToTop()
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  // eslint-disable-next-line no-new
  new LazyLoad({ })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <a href="#" class="lazy totop <md:hidden" :data-bg="scrollImage" :shadow="isVisible" :style="style" aria-label="to-top" @click="toTop" />
</template>

<style lang="scss" scoped>
.totop {
  position: fixed;
  width: 70px;
  height: 900px;
  right: 25px;
  transition: top 0.5s ease-in-out;
  animation: float 2s ease-in-out infinite;
}
@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>

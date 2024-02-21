<script setup lang="ts">
import { isClient, useWindowScroll } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'
import type Lenis from '@studio-freight/lenis'

let lenis: Lenis

const { y } = useWindowScroll()

const hide = 'top: -900px'
const style = ref(hide)
function onScroll() {
  if (y.value > 200) {
    if (window.innerWidth > 720)
      style.value = `top: ${Math.min(window.innerHeight - 968, 0)}px`
    else
      style.value = `top: -640px`
  }
  else {
    style.value = hide
  }
}
function toTop() {
  if (isClient) {
    lenis.scrollTo(0, {
      offset: 0,
      immediate: false,
    })
  }
}

function raf(time: any) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

onMounted(async () => {
  window.addEventListener('scroll', onScroll)
  onScroll()

  if (window.innerWidth >= 768) {
    const LenisModule = await import('@studio-freight/lenis')
    const Lenis = LenisModule.default
    lenis = new Lenis({ lerp: 0.04 })

    requestAnimationFrame(raf)
  }
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <a href="#" class="totop" :style="style" aria-label="to-top" @click="toTop" />
</template>

<style lang="scss" scoped>
.totop {
  position: fixed;
  width: 70px;
  height: 900px;
  right: 25px;
  z-index: 50;
  background-image: url("../assets/scroll.png");
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

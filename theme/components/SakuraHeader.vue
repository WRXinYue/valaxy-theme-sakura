<script lang="ts" setup>
import { useSiteConfig } from 'valaxy'
import { ref } from 'vue'

const siteConfig = useSiteConfig()

const bgClass = ref('filter-dot')

const hello = 'Hello, sakura'
const motto = 'You got to put the past behind you before you can move on.'
// const social = []
const cover = 'https://w.wallhaven.cc/full/we/wallhaven-wewdy7.jpg'
</script>

<template>
  <header class="relative flex px-70px justify-center flex-items-center w-full h-100vh">
    <div class="headertop absolute h-full w-full top-0 overflow-hidden" :class="bgClass">
      <video class="object-cover block bg-cover w-full h-full" preload="auto" autoplay loop muted>
        <source src="https://wrxinyue-images.s3.bitiful.net/wallpaper/Genshin Impact - Yae Miko (4) Cybust PC.mp4" type="video/mp4">
        您的浏览器不支持视频标签。
      </video>
    </div>
    <!-- <div class="banner" :style="`background-image: url(${cover})`" /> -->
    <div class="front-wave absolute z-12 bottom-0 w-[400%] h-65px" />
    <div class="foreground-wave absolute z-12 bottom-0 w-[400%] h-80px" />
    <div class="info z-4">
      <GlitchText :text="hello" />
      <div
        class="<md:w-full w-600px text-white w-full h-full rounded-2xl px-4 py-3"
        style="background-color: rgba(0, 0, 0, 0.5);"
      >
        <div class="text-center text-lg flex items-center items-center w-full h-full">
          <div class="i-fa-quote-left text-xs" />
          <div class="px-2">
            {{ motto }}
          </div>
          <div class="i-fa-quote-right text-xs" />
          <a v-for="s in siteConfig" :href="s.url" aria-label="icon" target="_blank">
            <div :class="[s.icon]" />
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.front-wave {
  background: url("../assets/wave1.png") repeat-x;
  animation: front-wave-animation 30s infinite linear;
}

.foreground-wave {
  background: url("../assets/wave2.png") repeat-x;
  animation: foreground-wave-animation 20s infinite linear;
}

.info {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@keyframes front-wave-animation {
  0% {
    left: 0;
  }

  100% {
    left: -997px;
  }
}

@keyframes foreground-wave-animation {
  0% {
    left: 0;
  }

  100% {
    left: -1009px;
  }
}

.headertop::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background-attachment: fixed
}

.headertop.filter-dim::before {
  background-color: rgba(0, 0, 0, 0.3)
}

.headertop.filter-grid::before {
  background-image: url(https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/grid.png)
}

.filter-dot.filter-dot::before {
  background-image: url(https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/dot.gif);
}
</style>

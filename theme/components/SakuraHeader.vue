<script lang="ts" setup>
// import { useSiteConfig } from 'valaxy'
import { ref } from 'vue'

// const siteConfig = useSiteConfig()

const bgClass = ref('filter-dot')

const hello = 'Hello, sakura'
const motto = 'You got to put the past behind you before you can move on.'
// const social = []
const cover = 'https://wrxinyue-images.s3.bitiful.net/wallhaven-wewdy7.jpg'
</script>

<template>
  <div style="width: 100%; height: 100vh;" class="headertop" :class="bgClass">
    <div class="banner" :style="`background-image: url(${cover})`">
      <div class="wave1" />
      <div class="wave2" />
      <div class="info">
        <GlitchText :text="hello" />
        <div class="<md:w-full w-600px text-white w-full h-full rounded-2xl px-4 py-3" style="background-color: rgba(0, 0, 0, 0.5);">
          <div class="text-center text-lg flex items-center items-center w-full h-full">
            <div class="i-fa-quote-left text-xs" />
            <div class="px-2">
              {{ motto }}
            </div>
            <div class="i-fa-quote-right text-xs" />
          </div>
          <!-- <div class="contact">
            <a
              v-for="s in social"
              :href="s.url"
              aria-label="icon"
              target="_blank"
            >
              <i class="fab" :class="[s.icon]" />
            </a>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  background-size: cover;
  background-position: center center;
  position: relative;
  overflow: hidden;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .wave1,
  .wave2 {
    position: absolute;
    width: 400%;
    bottom: 0;
    z-index: 4;
  }

  .wave1 {
    background: url("../assets/wave1.png") repeat-x;
    height: 65px;
    animation: wave-animation-1 30s infinite linear;
    z-index: 4;
  }

  .wave2 {
    background: url("../assets/wave2.png") repeat-x;
    height: 80px;
    animation: wave-animation-2 20s infinite linear;
    z-index: 4;
  }

  .info {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 4;
  }
  .contact {
    display: flex;
    justify-content: center;
    font-size: 24px;
    padding-bottom: 12px;

    a {
      color: white;
      margin: 6px;
    }
  }
}

@media (max-width: 720px) {
  .banner {
    .info {
      margin: 0 0.5em;
    }

    .text {
      margin: 1em 0.5em;
    }
  }
}

@keyframes wave-animation-1 {
  0% {
    left: 0;
  }

  100% {
    left: -997px;
  }
}

@keyframes wave-animation-2 {
  0% {
    left: 0;
  }

  100% {
    left: -1009px;
  }
}

.headertop::before {
  content:'';
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  z-index:3;
  background-attachment:fixed
}
.headertop.filter-dim::before {
    background-color:rgba(0,0,0,0.3)
}
.headertop.filter-grid::before {
    background-image:url(https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/grid.png)
}
.filter-dot.filter-dot::before {
  background-image: url(https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/dot.gif);
}
</style>

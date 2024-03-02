<script setup lang="ts">
import { onMounted } from 'vue'

// import Typed from 'typed.js'
import { useThemeConfig } from '../composables'

const themeConfig = useThemeConfig()

onMounted(() => {

  // new Typed('#typed', {
  //   strings: [themeConfig.value.homeMotto],
  //   typeSpeed: 50,
  //   backSpeed: 50,
  //   loop: false,
  // })
})
</script>

<template>
  <div class="text-center text-lg flex items-center items-center w-full h-full text-white ">
    <div class="blink" i-fa6-solid-quote-left text-base />
    <div class="px-2 w-full">
      <!-- <span id="typed" /> -->
      {{ themeConfig.banner.motto }}
    </div>
    <div class="blink" i-fa6-solid-quote-right text-base />
  </div>
</template>

<style lang="scss" scoped>
.blink {
  animation: blink 1s infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>

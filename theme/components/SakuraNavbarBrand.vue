<script setup lang="ts">
import { useSiteConfig } from 'valaxy'
import { useThemeConfig } from '../composables'

const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()
</script>

<template>
  <div class="relative float-left line-height-75px ml-8" style="animation: sitetop 1s">
    <span class="logolink moe-mashiro flex w-auto h-full items-center">
      <img v-if="themeConfig.favicon" class="w-40px h-40px" alt="logo" :src="siteConfig.favicon">
      <RouterLink class="text-xl" to="/" :aria-label="siteConfig.title">
        <span class="sakurasono mr-1">{{ themeConfig.prefixName }}</span>
        <span class="shironeko">{{ themeConfig.siteName }}</span>
      </RouterLink>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.logolink .sakurasono {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  color: #464646;
  height: auto;
  line-height: 25px;
  padding-bottom: 0;
}

.logolink a:hover .sakurasono {
  background-color: orange;
  color: #fff
}

.logolink a:hover .shironeko,
.logolink a:hover rt {
  color: orange
}

.logolink.moe-mashiro a {
  color: #464646;
  float: left;
  font-size: 28px;
  font-weight: 800;
  height: 56px;
  line-height: 56px;
  text-decoration-line: none
}

.logolink.moe-mashiro .sakurasono {
  font-size: 25px;
  border-radius: 9px;
  padding-bottom: 2px;
  padding-top: 5px
}

.moe-mashiro {
  font-family: 'Moe-Mashiro', sans-serif;
}
</style>

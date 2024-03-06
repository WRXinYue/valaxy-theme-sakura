<script setup lang="ts">
import { useSiteConfig } from 'valaxy'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeConfig } from '../composables'
import { checkRouteAgainstConditions } from '../utils'

const route = useRoute()
const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()

const isShowSidebarHamburger = ref()

onMounted(() => {
  isShowSidebarHamburger.value = checkRouteAgainstConditions(route, themeConfig.value.sidebarHamburger)
})
</script>

<template>
  <div :class="isShowSidebarHamburger && 'ml-8'">
    <img v-if="themeConfig.favicon" class="w-40px h-40px" alt="logo" :src="siteConfig.favicon">
    <RouterLink class="logo-link moe-mashiro" to="/" :aria-label="siteConfig.title">
      <template v-if="typeof themeConfig.navbarTitle === 'string'">
        <span mr-1>{{ themeConfig.navbarTitle }}</span>
      </template>
      <template v-else>
        <span mr-1>{{ themeConfig.navbarTitle[0] }}</span>
        <span inline-block>{{ themeConfig.navbarTitle[1] }}</span>
        <span>{{ themeConfig.navbarTitle[2] }}</span>
      </template>
    </RouterLink>
  </div>
</template>

<style lang="scss">
$navbar-hover-bg-color: orange;
$navbar-default-color: #464646;
$navbar-hover-color: #fff;

.logo-link {
  color: $navbar-default-color;
  font-size: 28px;
  font-weight: 800;

  span:first-child {
    border-radius: 9px;
    padding-bottom: 2px;
    padding-top: 5px;
  }

  &:hover {
    span:first-child {
      background-color: $navbar-hover-bg-color;
      color: $navbar-hover-color;
    }
    span:nth-of-type(2) {
      animation: rotate 1s linear infinite;
    }
    span:not(:first-child) {
      color: $navbar-hover-bg-color;
    }
  }
}

.moe-mashiro {
  font-family: 'Moe-Mashiro', sans-serif;
}
</style>

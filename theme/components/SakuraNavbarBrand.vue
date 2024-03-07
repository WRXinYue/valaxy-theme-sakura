<script setup lang="ts">
import { useSiteConfig } from 'valaxy'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeConfig } from '../composables'
import { checkRouteAgainstConditions } from '../utils'

const route = useRoute()
const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()

const isShowPCSidebarHamburger = computed(() => {
  if (window.innerWidth > 768)
    return checkRouteAgainstConditions(route, themeConfig.value.sidebarPCOptions.hamburger)
  else
    return checkRouteAgainstConditions(route, themeConfig.value.sidebarMobileOptions.hamburger)
})
</script>

<template>
  <div :class="isShowPCSidebarHamburger && 'ml-8'">
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

<style lang="scss" scoped>
.logo-link {
  color: var(--st-c-navbar-text);
  font-size: 28px;
  font-weight: 800;

  span:first-child {
    border-radius: 9px;
    padding-bottom: 2px;
    padding-top: 5px;
  }

  &:hover {
    span:first-child {
      background-color: var(--st-c-navbar-hover-bg-color);
      color: var(--st-c-navbar-hover-color);
    }
    span:nth-of-type(2) {
      animation: rotate 1s linear infinite;
    }
    span:not(:first-child) {
      color: var(--st-c-navbar-hover-bg-color);
    }
  }
}

.moe-mashiro {
  font-family: 'Moe-Mashiro', sans-serif;
}
</style>

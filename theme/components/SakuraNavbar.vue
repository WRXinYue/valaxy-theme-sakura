<script setup lang="ts">
import { isDark, toggleDark, useSiteConfig } from 'valaxy'
import { computed, onMounted, onUnmounted, ref } from 'vue'

// import { useRoute } from 'vue-router'
import { useThemeConfig } from '../composables'

// const route = useRoute()
// const isIndex = computed(() => route.path.replace(/index.html$/, '') === '/')

const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()

const scrolled = ref(false)
const hoverHeaderActive = ref(false)
/** Special handling of certain links */
const processedNavItems = computed(() => themeConfig.value.nav.map(item => ({
  ...item,
  isExternal: item.link === '/atom.xml',
})))

const isHeaderActive = computed(() => {
  return hoverHeaderActive.value || scrolled.value
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  const scrollTop = window.scrollY
  scrolled.value = scrollTop > 100
}
</script>

<template>
  <header class="px-3 h-60px" :class="isHeaderActive ? 'active-header' : ''" @mouseover="hoverHeaderActive = true" @mouseleave="hoverHeaderActive = false">
    <div class="relative float-left line-height-75px ml-8" style="animation: sitetop 1s">
      <span class="logolink moe-mashiro flex w-auto h-full items-center">
        <img v-if="themeConfig.favicon" class="w-40px h-40px" alt="logo" :src="siteConfig.favicon">
        <RouterLink class="text-xl" to="/" :aria-label="siteConfig.title">
          <span class="sakurasono mr-1">{{ themeConfig.prefixName }}</span>
          <span class="shironeko">{{ themeConfig.siteName }}</span>
        </RouterLink>
      </span>
    </div>
    <div :class="isHeaderActive ? 'element-slide-left-fade-in <md:hidden' : 'md:relative hidden'" class="text-sm text-gray-500 leading-5 h-full w-auto">
      <template v-for="(item, i) in processedNavItems" :key="i">
        <div class="app-link-after relative h-full w-auto items-center inline-flex justify-center hover:after:w-full">
          <AppLink v-if="!item.isExternal" :to="item.link" rel="noopener" class="text-[#666666] hover:text-[#fe9600]">
            <div :class="item.icon" class="mr-0.5 inline-flex align-text-top" />
            {{ item.text }}
          </AppLink>
          <a v-else :href="item.link" rel="noopener" class="text-[#666666] hover:text-[#fe9600]">
            <div :class="item.icon" class="mr-0.5 inline-flex align-text-top" />
            {{ item.text }}
          </a>
        </div>

        <span v-if="i !== themeConfig.nav.length - 1" class="mr-3 ml-3" />
      </template>
    </div>
    <SakuraSidebar v-if="$slots['sidebar-child']">
      <slot name="sidebar-child" />
    </SakuraSidebar>
    <!-- <YunSidebar v-else /> -->

    <button type="button" aria-label="Toggle Dark Mode" @click="toggleDark()">
      <div v-if="!isDark" i-ri-sun-line />
      <div v-else i-ri-moon-line />
    </button>
  </header>

  <!-- <div v-if="mobileNavOpen" class="overlay" @click="mobileNavOpen = false" /> -->
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  transition: all 0.4s ease;
}

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

.active-header {
  position: fixed;
  left: 0;
  background: var(--st-c-bg-nav);
  box-shadow: 0 1px 40px -8px rgba(0, 0, 0, .5);
}

.app-link-after::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 6px;
  background-color: #fe9600;
  transition: width 0.3s ease;
}
</style>

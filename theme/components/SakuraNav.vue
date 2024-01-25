<script setup>
import { isDark, toggleDark, useSiteConfig } from 'valaxy'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

// import { useRoute } from 'vue-router'
import gsap from 'gsap'
import { useThemeConfig } from '../composables'

// const route = useRoute()
// const isIndex = computed(() => route.path.replace(/index.html$/, '') === '/')

const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()

/** GSAP */
const mobileNavGSAP = ref(null)
const pcNavGSAP = ref(null)

const scrolled = ref(false)
const showYYA = ref(false)
const mobileNavOpen = ref(false)
/** Special handling of certain links */
const processedNavItems = computed(() => themeConfig.value.nav.map(item => ({
  ...item,
  isExternal: item.link === '/atom.xml',
})))

const isHeaderActive = computed(() => {
  return showYYA.value || scrolled.value || mobileNavOpen.value
})

function pcNavAnimation() {
  gsap.from(pcNavGSAP.value, {
    duration: 1.25,
    opacity: 0,
    x: 30,
    stagger: 0.2,
    ease: 'power3.out',
  })
}

watch(isHeaderActive, (newVal) => {
  newVal && pcNavAnimation()
})

/** Monitor the mobile navigation bar */
watch(mobileNavOpen, (newVal) => {
  newVal ? gsap.to(mobileNavGSAP.value, { x: 0, duration: 0.5 }) : gsap.to(mobileNavGSAP.value, { x: '-110%', duration: 0.5 })
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
  <header class="px-3 h-60px" :class="isHeaderActive ? 'yya' : ''" @mouseover="showYYA = true" @mouseleave="showYYA = false">
    <button class="mobile_btn md:!hidden" :class="mobileNavOpen ? 'mobile_btn-open' : ''" @click="mobileNavOpen = !mobileNavOpen">
      <!-- TODO: Add more color configurations? -->
      <span :class="isHeaderActive ? 'bg-orange' : 'bg-white'" />
      <span :class="isHeaderActive ? 'bg-orange' : 'bg-white'" />
      <span :class="isHeaderActive ? 'bg-orange' : 'bg-white'" />
    </button>

    <div class="relative float-left line-height-75px ml-12px" style="animation: sitetop 1s">
      <span class="logolink moe-mashiro flex w-auto h-full items-center">
        <img v-if="themeConfig.favicon" class="w-40px h-40px" alt="logo" :src="siteConfig.favicon">
        <RouterLink class="text-xl" to="/" :aria-label="siteConfig.title">
          <span class="sakurasono mr-1">{{ themeConfig.prefixName }}</span>
          <span class="shironeko">{{ themeConfig.siteName }}</span>
        </RouterLink>
      </span>
    </div>
    <div ref="pcNavGSAP" :class="isHeaderActive ? 'md:inline' : 'hidden'" class="text-sm text-gray-500 leading-5 h-full w-auto">
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

        <span v-if="i !== themeConfig.nav.length - 1" class="mr-2 ml-2">·</span>
      </template>
    </div>

    <button type="button" aria-label="Toggle Dark Mode" @click="toggleDark()">
      <div v-if="!isDark" i-ri-sun-line />
      <div v-else i-ri-moon-line />
    </button>
  </header>

  <div v-if="mobileNavOpen" class="overlay" @click="mobileNavOpen = false" />

  <div ref="mobileNavGSAP" class="w-60% h-full z-200 fixed mt-60px" style="background: rgba(255, 255, 255, 0.95); transform: translateX(-110%)">
    <div class="border border-t" />
    <template v-for="(item, i) in processedNavItems" :key="i">
      <div class="border-b flex justify-center">
        <AppLink v-if="!item.isExternal" :to="item.link" rel="noopener" class="text-[#666666] hover:text-[#fe9600]">
          {{ item.text }}
        </AppLink>
        <a v-else :href="item.link" rel="noopener" class="text-[#666666] hover:text-[#fe9600]">
          {{ item.text }}
        </a>
      </div>
    </template>
  </div>
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

@font-face {
  font-family: 'Gen Jyuu Gothic Monospace Bold';
  src: url("../assets/Gen Jyuu Gothic Monospace Bold.ttf");
}

.moe-mashiro {
  font-family: 'Gen Jyuu Gothic Monospace Bold', sans-serif;
}

.yya {
  position: fixed;
  left: 0;
  background: rgba(255, 255, 255, 0.95);
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 30;
}

.mobile_btn {
  width: 20px;
  height: 22px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  transition: transform 0.3s;

  span {
    position: relative;
    width: 100%;
    height: 5px;
    border-radius: 20px;
  }

  span:nth-child(1), span:nth-child(3) {
    width: 50%;
    align-self: flex-end;
    transform-origin: left;
    transition: transform 0.3s;
  }

  span:nth-child(1) {
    align-self: flex-start;
    transform-origin: right;
  }

}

.mobile_btn-open {
  transform: rotate(-45deg);
}

.mobile_btn-open span:nth-child(1), .mobile_btn-open span:nth-child(3) {
  transform: rotate(-90deg);
}
</style>

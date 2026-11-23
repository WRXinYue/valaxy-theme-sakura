<script setup lang="ts">
import type { NavbarOptions, NavItem } from '../types/index'
import { useIntersectionObserver } from '@vueuse/core'
import { useSiteConfig } from 'valaxy'
import { computed, ref, watchPostEffect } from 'vue'
import { useLayout, useThemeConfig } from '../composables'
import { useSakuraAppStore } from '../stores'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  navbar?: NavItem[]
  options?: NavbarOptions
  placement?: 'fixed' | 'sticky'
}>()

const sakuraAppStore = useSakuraAppStore()
const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()
const { layout } = useLayout()

const stickySentinelEl = ref<HTMLElement>()
const isStuck = ref(false)

const navbar = computed(() => props.navbar || themeConfig.value.navbar)
const navbarOptions = computed(() => props.options || themeConfig.value.navbarOptions)

const brandTitle = computed(() => siteConfig.value.title || '')
const placement = computed(() => props.placement ?? 'fixed')

function updateStuck() {
  if (!stickySentinelEl.value || placement.value !== 'sticky') {
    isStuck.value = false
    return
  }

  const top = stickySentinelEl.value.getBoundingClientRect().top
  isStuck.value = top <= 0.5
}

watchPostEffect(() => {
  layout.value
  placement.value
  updateStuck()
})

useIntersectionObserver(
  stickySentinelEl,
  ([entry]) => {
    if (placement.value !== 'sticky') {
      isStuck.value = false
      return
    }
    isStuck.value = !entry.isIntersecting
  },
  { threshold: 0 },
)
</script>

<template>
  <div v-if="placement === 'sticky'" ref="stickySentinelEl" class="sakura-navbar-sentinel" aria-hidden="true" />
  <!-- NOTE: Dynamic :class switching affects triggering the component loader for some reason, not sure why. -->
  <header v-bind="$attrs" flex="~" w="full" top-0 z-100 class="sakura-navbar" :class="placement">
    <div class="sakura-safe-padding navbar-content" w="full">
      <div class="navbar-area navbar-brand">
        <slot name="brand" :favicon="navbarOptions.favicon" :title="brandTitle" :is-stuck="isStuck" :placement="placement">
          <div flex="~ items-center">
            <template v-if="themeConfig.sidebarOptions?.position === 'left'">
              <div class="flex-center" :class="!themeConfig.sidebarOptions.enableOnDesktop && 'md:hidden'">
                <template v-if="themeConfig.navbarOptions.hamburgerStyle === 'old'">
                  <SakuraHamburgerOld class="mr-4" :active="sakuraAppStore.sidebar.isOpen" @click="sakuraAppStore.sidebar.toggle" />
                </template>
                <template v-if="themeConfig.navbarOptions.hamburgerStyle === 'uneven'">
                  <SakuraHamburgerUneven class="mr-4" :active="sakuraAppStore.sidebar.isOpen" @click="sakuraAppStore.sidebar.toggle" />
                </template>
              </div>
            </template>

            <SakuraNavbarBrand :favicon="navbarOptions.favicon" :title="brandTitle" />
          </div>
        </slot>
      </div>

      <div class="navbar-area navbar-link">
        <slot
          name="link"
          :navbar="navbar"
          :show-marker="navbarOptions.showMarker"
          :is-stuck="isStuck"
          :placement="placement"
        >
          <SakuraNavbarLink :navbar :show-marker="navbarOptions.showMarker" />
        </slot>
      </div>

      <div class="navbar-area navbar-tool">
        <slot name="tool">
          <div h-full print:op0 flex="~ center" class="sakura-navbar-tools">
            <SakuraToggleDark v-if="navbarOptions.tools.includes('toggleDark')" />
            <SakuraToggleLocale v-if="navbarOptions.tools.includes('toggleLocale')" />
            <SakuraSearchTrigger v-if="navbarOptions.tools.includes('search')" />
            <div v-if="themeConfig.sidebarOptions?.position === 'right'" i-ri-menu-4-fill @click="sakuraAppStore.sidebar.toggle" />
            <slot name="tool-ext" />
          </div>
        </slot>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.sakura-navbar-sentinel {
  height: 1px;
  width: 1px;
  opacity: 0;
  pointer-events: none;
  margin-bottom: -1px;
}

.sakura-navbar {
  .navbar-content {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    height: var(--sakura-navbar-height);
    background: var(--sakura-navbar-bg);
    transition: background-color var(--va-transition-duration) ease-in;
  }

  .navbar-area {
    min-width: 0;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .navbar-brand {
    justify-self: start;
    justify-content: flex-start;
  }

  .navbar-link {
    justify-self: center;
    justify-content: center;
  }

  .navbar-tool {
    justify-self: end;
    justify-content: flex-end;
  }

  &-tools {
    & > *:not(:last-child) {
      margin-right: 8px;
    }
  }

  // .sakura-logo-link span:first-child {
  //   background-color: oklch(100% 0 0 / 50%);
  // }

  .sakura-nav-link-icon {
    height: 1em;
    width: 1em;
    margin-right: 0.2rem;
  }

  .sakura-navbar-tools {
    color: var(--sakura-navbar-item-color);
  }
}
</style>

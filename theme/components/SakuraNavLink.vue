<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { NavItem } from '../types/index'
import { useThemeConfig } from '../composables'

const { navbar } = withDefaults(defineProps<{
  navbar?: NavItem[]
}>(), {})

const themeConfig = useThemeConfig()
const route = useRoute()
const { locale } = useI18n()

const marker = ref()

const navLinkItems = computed(() => (navbar || themeConfig.value.navbar))
const showMarker = computed(() => (themeConfig.value.navbarOptions?.showMarker))

watch(() => route.path, () => {
  nextTick(updateMarker)
})

watch(() => locale.value, () => {
  setTimeout(() => updateMarker(), 0)
})

function updateMarker() {
  if (!showMarker.value)
    return

  const routeActive = document.querySelector('.sakura-nav-link .router-link-active') as HTMLElement
  if (!routeActive)
    return

  marker.value.style.left = `${routeActive.offsetLeft}px`
  marker.value.style.width = `${routeActive.offsetWidth}px`
}

onMounted(() => {
  nextTick(() => {
    marker.value = document.querySelector('.sakura-nav-link #marker')
    updateMarker()
  })
})
</script>

<template>
  <nav class="sakura-nav-link">
    <template v-for="(item, i) in navLinkItems" :key="i">
      <SakuraNavLinkItem v-bind="item" />
      <span v-if="i !== (navbar?.length || themeConfig.navbar.length) - 1" class="ml-3 mr-3" />
    </template>

    <div v-if="showMarker" id="marker" />
  </nav>
</template>

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-nav-link {
  display: none;
  height: 100%;
  font-size: 0.875rem;
  color: rgba(107, 114, 128, var(--un-text-opacity));
  line-height: 1.25rem;
  transform: translateX(0);

  #marker {
    position: absolute;
    border-bottom: var(--st-c-sidebar-marker-h) solid var(--st-c-secondary);
    transition-property: opacity, left, top;
    transition-duration: 0.5s;
    pointer-events: none;
    height: 100%;
  }

  @include screen('md') {
    display: flex;
  }
}
</style>

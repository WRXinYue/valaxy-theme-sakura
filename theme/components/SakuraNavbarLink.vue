<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import type { NavItem } from '../types/index'
import { useLayout, useThemeConfig } from '../composables'

const props = withDefaults(defineProps<{
  navbar: NavItem[]
  showMarker?: boolean
}>(), {
  showMarker: false,
})

const themeConfig = useThemeConfig()
const route = useRoute()
const { isIncludes } = useLayout()
const { locale } = useI18n()

const marker = ref()
const show = ref(false)

const invert = computed(() => themeConfig.value?.navbarOptions?.invert)

function updateMarker() {
  if (!props.showMarker)
    return

  const routeActive = document.querySelector('.sakura-navbar-link .router-link-active') as HTMLElement
  if (!routeActive)
    return

  marker.value.style.left = `${routeActive.offsetLeft}px`
  marker.value.style.width = `${routeActive.offsetWidth}px`
}

function handleShowWithDelay(value: boolean | string | string[]) {
  // Prevents animation when the navbar is hidden during the first load
  if (isIncludes(value)) {
    setTimeout(() => {
      show.value = true
    }, 1000)
  }
  else {
    show.value = true
  }
}

watch(() => route.path, () => nextTick(updateMarker))
watch(() => locale.value, () => setTimeout(() => updateMarker(), 0))

onMounted(() => {
  if (invert.value)
    handleShowWithDelay(invert.value)
  else
    show.value = true

  nextTick(() => {
    updateMarker()
  })
})
</script>

<template>
  <nav class="sakura-navbar-link">
    <template v-if="show">
      <SakuraNavbarLinkItem v-for="(item, i) in navbar" :key="i" v-bind="item" />
      <div v-if="showMarker" ref="marker" class="marker" />
    </template>
  </nav>
</template>

<style lang="scss" scoped>
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-navbar-link {
  display: none;
  height: 100%;
  font-size: 0.875rem;
  color: var(--sakura-navbar-item-color);
  line-height: 1.25rem;
  transform: translateX(0);

  .marker {
    position: absolute;
    border-bottom: var(--sakura-navbar-marker-height) solid
      var(--sakura-color-primary);
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

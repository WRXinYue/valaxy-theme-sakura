<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import type { NavItem } from '../types/index'

const props = withDefaults(defineProps<{
  navbar: NavItem[]
  showMarker?: boolean
}>(), {
  showMarker: false,
})

const route = useRoute()
const { locale } = useI18n()

const marker = ref()
const preload = ref(true)
const navLink = ref()

function updateMarker() {
  if (!props.showMarker)
    return

  const routeActive = document.querySelector('.sakura-navbar-link .router-link-active') as HTMLElement

  const child = routeActive
  const parent = navLink.value

  if (!routeActive) {
    console.error('Not found: .sakura-navbar-link .router-link-active')
    return
  }

  const childRect = child.getBoundingClientRect()
  const parentRect = parent.getBoundingClientRect()

  const left = childRect.left - parentRect.left

  marker.value.style.left = `${left}px`
  marker.value.style.width = `${routeActive?.offsetWidth || 0}px`
}

watch(() => route.path, () => nextTick(updateMarker))
watch(() => locale.value, () => setTimeout(() => updateMarker(), 0))

onMounted(() => {
  // HACK: Not the most elegant solution, but it works. :)
  // Consider using a JavaScript alternative if necessary.
  setTimeout(() => {
    preload.value = false
  }, 500)

  nextTick(() => {
    updateMarker()
  })
})
</script>

<template>
  <nav ref="navLink" class="sakura-navbar-link" :class="preload && 'sakura-preload'">
    <SakuraNavbarLinkItem v-for="(item, i) in navbar" :key="i" v-bind="item" />
    <div v-if="showMarker" ref="marker" class="marker" />
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

<script lang="ts" setup>
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { computed, nextTick, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  stuck?: boolean
}>(), {
  stuck: false,
})

const { y } = useWindowScroll()
const { height } = useWindowSize()

const isInHero = computed(() => {
  if (props.stuck)
    return false
  if (height.value === 0)
    return true
  return y.value < height.value - 1
})

const rootEl = ref<HTMLElement | null>(null)

// hero 与顶部导航布局不同，用 FLIP 让导航在两种位置之间平滑过渡
watch(isInHero, async () => {
  const linkEl = rootEl.value?.querySelector<HTMLElement>('.navbar-link')
  if (!linkEl)
    return
  const first = linkEl.getBoundingClientRect()
  await nextTick()
  const last = linkEl.getBoundingClientRect()
  const dx = first.left - last.left
  if (Math.abs(dx) < 1)
    return
  linkEl.animate([
    { transform: `translateX(${dx}px)` },
    { transform: 'none' },
  ], {
    duration: 450,
    easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
  })
})
</script>

<template>
  <div ref="rootEl" class="sakura-home-navbar" :class="{ 'is-in-hero': isInHero }">
    <SakuraNavbar placement="sticky">
      <template #link="{ navbar, showMarker }">
        <div flex="~ center" min-w-0 flex-1>
          <SakuraNavbarLink :navbar :show-marker="showMarker" />
        </div>
      </template>
      <template #tool-ext>
        <SakuraNavbarSound :active="isInHero" />
      </template>
    </SakuraNavbar>
  </div>
</template>

<style lang="scss" scoped>
.sakura-home-navbar :deep(.sakura-navbar) {
  max-height: var(--sakura-navbar-height, 64px);
  opacity: 1;
  overflow: hidden;
  pointer-events: auto;
}

.sakura-home-navbar :deep(.navbar-brand) {
  max-width: 320px;
  overflow: hidden;
  white-space: nowrap;
  transition:
    max-width 0.45s cubic-bezier(0.19, 1, 0.22, 1),
    opacity 0.3s ease;
}

@media (width < 768px) {
  .sakura-home-navbar.is-in-hero :deep(.sakura-navbar-brand) {
    display: none;
  }
}

@media (width >= 768px) {
  .sakura-home-navbar.is-in-hero :deep(.navbar-brand) {
    max-width: 0;
    opacity: 0;
    pointer-events: none;
  }

  .sakura-home-navbar.is-in-hero :deep(.navbar-content) {
    display: flex;
    justify-content: space-between;
  }

  .sakura-home-navbar.is-in-hero :deep(.navbar-link) {
    margin-right: auto;
  }
}
</style>

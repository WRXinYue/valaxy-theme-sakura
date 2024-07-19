<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSakuraAppStore } from '../stores'
import { useThemeConfig } from '../composables'

const props = withDefaults(defineProps<{
  position?: 'left' | 'right'
}>(), {})

const sakuraAppStore = useSakuraAppStore()
const route = useRoute()
const themeConfig = useThemeConfig()

const marker = ref()
const position = ref(props.position ?? themeConfig.value.sidebarOptions?.position)

watch(() => route.path, () => nextTick(updateMarker))

function updateMarker() {
  const routeActive = document.querySelector('.sakura-sidebar .site-link .router-link-active') as HTMLElement
  // const sidebarTop = document.querySelector('.sakura-sidebar .site-link') as HTMLElement

  marker.value.style.top = `${routeActive?.offsetTop || 0}px`
  marker.value.style.height = `${routeActive?.offsetHeight || 0}px`
}

onMounted(() => {
  updateMarker()
  marker.value = document.querySelector('.sakura-sidebar #marker')
})
</script>

<template>
  <div>
    <ValaxyOverlay class="md:hidden" :show="sakuraAppStore.sidebar.isOpen" @click="sakuraAppStore.sidebar.close" />

    <aside
      class="sakura-sidebar inset-y-0 overflow-y-auto transition"
      :class="[sakuraAppStore.sidebar.isOpen && 'open', position]"
      text="center" bg="contain no-repeat"
    >
      <slot>
        <SakuraSiteInfoCard />
        <SakuraSocialLinks />
        <SidebarThemeOverview class="mt-4" />
      </slot>
    </aside>
  </div>
</template>

<style lang="scss">
.sakura-sidebar {
  position: fixed;
  z-index: 1000;
  padding-top: 30px;
  width: var(--st-c-sidebar-width);
  background-image: var(--st-c-sidebar-bg-img);
  background-position: bottom 1rem center;
  background-color: var(--st-c-sidebar-bg-color);
  transition:
    box-shadow var(--va-transition-duration),
    background-color var(--va-transition-duration),
    opacity 0.25s,
    transform var(--va-transition-duration) cubic-bezier(0.19, 1, 0.22, 1) !important;

  &.left {
    transform: translateX(-100%);

    &.open {
      transform: translateX(0);
    }
  }

  &.right {
    right: 0;
    transform: translateX(100%);

    &.open {
      transform: translateX(0);
      right: 0;
    }
  }

  #marker {
    position: absolute;
    transition-property: opacity, left, top;
    transition-duration: 0.5s;
    pointer-events: none;
    height: 100%;
  }
}
</style>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useThemeConfig } from '../composables'
import type { Banner } from '../types/index'

const props = defineProps<{
  banner?: Banner
}>()

const themeConfig = useThemeConfig()
const loading = ref(true)

const banner = computed(() => props.banner || themeConfig.value.banner)

onMounted(() => {
  loading.value = false
})
</script>

<template>
  <header v-if="!loading" class="sakura-banner <md:px-5" :class="themeConfig.animation && 'element-slide-down'">
    <div class="headertop absolute h-full w-full top-0 overflow-hidden" :class="banner?.style ">
      <slot name="background-display" />

      <slot name="banner-overlay-bar" />
    </div>
    <slot name="info-overlay" />
  </header>
</template>

<style lang="scss">
.sakura-banner {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.headertop::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-attachment: fixed
}

.headertop.filter-dim::before {
  background-color: rgba(0, 0, 0, 0.3)
}

.headertop.filter-grid::before {
  background-image: url(https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/grid.png)
}

.filter-dot.filter-dot::before {
  background-image: url(https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/dot.gif);
}
</style>

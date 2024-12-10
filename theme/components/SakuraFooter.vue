<script lang="ts" setup>
import type { Pkg } from 'valaxy'
import { computed } from 'vue'
import type { Footer } from '../types'
import { useThemeConfig } from '../composables'

const props = defineProps<{
  footer?: Footer
  pkg?: Pkg
}>()

const themeConfig = useThemeConfig()

const footer = computed (() => props.footer || themeConfig.value.footer)
</script>

<template>
  <footer class="sakura-footer h-$sakura-footer-height" text="center sm" style="color:var(--va-c-text-light)">
    <div v-if="footer.icp" class="icp" p="y-2" v-html="footer.icp" />

    <SakuraCopyright />

    <SakuraPowered v-if="footer.powered" />

    <slot />
  </footer>
</template>

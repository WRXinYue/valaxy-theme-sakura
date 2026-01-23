<script lang="ts" setup>
import type { LinkItem } from '../types'
import { computed } from 'vue'
import { useLinkData, useThemeConfig } from '../composables'

const props = defineProps<{
  links?: LinkItem[]
}>()

const themeConfig = useThemeConfig()
const source = computed(() => props.links || themeConfig.value.links || [])
const { data: linksData } = useLinkData(source)
</script>

<template>
  <SakuraSidebarCard v-if="linksData?.length" class="sakura-sidebar-links" icon="i-ri-links-line" title="Links">
    <div class="sakura-sidebar-links-list px-2" flex="~ col" gap="2">
      <a v-for="link in linksData" :key="link.url" :href="link.url" target="_blank" class="sidebar-link-item" flex="~ items-center">
        <img v-if="link.avatar" :src="link.avatar" class="mr-2 h-6 w-6 rounded-full" :alt="link.name">
        <span>{{ link.name }}</span>
      </a>
    </div>
  </SakuraSidebarCard>
</template>

<style lang="scss" scoped>
.sidebar-link-item {
  color: var(--sakura-color-text);
  transition: color 0.3s;
  font-size: 0.85rem;

  &:hover {
    color: var(--sakura-color-primary);
  }
}
</style>

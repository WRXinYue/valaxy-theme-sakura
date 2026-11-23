<script lang="ts" setup>
import type { LinkItem } from '../types'
import { computed } from 'vue'
import { useLinkData, useThemeConfig } from '../composables'

const props = defineProps<{
  links: string | LinkItem[]
  random: boolean
  /**
   * @description: 图片加载失败时显示的图片
   */
  errorImg?: string
}>()

const themeConfig = useThemeConfig()
const { data } = useLinkData(props.links, props.random)

const imageCard = computed(() => themeConfig.value.ui.links?.image)
</script>

<template>
  <div class="links">
    <ul class="link-items">
      <li v-for="link in data" :key="link.url || link.rss" class="link-item" :style="{ '--link-accent': link.color }">
        <a class="link-url" :href="link.url" :title="link.name" rel="friend noopener" target="_blank">
          <div class="link-left">
            <SakuraImageCard v-bind="imageCard" class="link-avatar" width="64" height="64" w="16" h="16" :src="link.avatar" :alt="link.name" :error-img="errorImg" />
          </div>
          <div class="link-info">
            <div class="link-blog">{{ link.blog || link.name }}</div>
            <div v-if="link.desc" class="link-desc">{{ link.desc }}</div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.link-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.link-url {
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 100%;
  padding: 1rem;
  border: 1px solid var(--sakura-color-divider);
  border-radius: var(--sakura-post-card-rd);
  background: var(--sakura-card-bg);
  color: var(--sakura-color-text);
  transition: border-color 0.2s;
}

.link-url:hover,
.link-url:focus-visible {
  border-color: var(--link-accent, var(--sakura-color-primary));
}

.link-avatar {
  border-radius: 50%;
}

.link-info {
  min-width: 0;
  overflow-wrap: anywhere;
}

.link-blog {
  font-weight: 700;
}

.link-desc {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: var(--sakura-color-text-muted);
}
</style>

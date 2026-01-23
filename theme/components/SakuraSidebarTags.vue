<script lang="ts" setup>
import { useTags } from 'valaxy'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSakuraTags } from '../composables'

const tags = useTags()
const { t } = useI18n()
const router = useRouter()
const { getTagStyle } = useSakuraTags()

function displayTag(tag: string) {
  router.push({ path: '/tags/', query: { tag } })
}
</script>

<template>
  <SakuraSidebarCard class="sakura-sidebar-tags" icon="i-ri-price-tag-3-line" :title="t('menu.tags')">
    <div class="items-end justify-center" flex="~ wrap" gap="1">
      <SakuraButton
        v-for="([key, tag], index) in Array.from(tags).sort()"
        :key="key"
        class="sakura-tag-button"
        :style="getTagStyle(index)"
        @click="displayTag(key.toString())"
      >
        <span mx-1 inline-flex>{{ key }}</span>
        <span inline-flex text="xs">[{{ tag.count }}]</span>
      </SakuraButton>
    </div>
  </SakuraSidebarCard>
</template>

<style lang="scss" scoped>
.sakura-tag-button {
  color: var(--sakura-tag-color) !important;
  background-color: var(--sakura-tag-bg);
  line-height: 1.5rem;
  padding: 0 0.5rem;
  font-size: 0.85rem;
  margin: 2px;

  &:hover {
    color: var(--sakura-tag-color, var(--sakura-color-primary)) !important;
    border-color: var(--sakura-tag-color, var(--sakura-color-primary));
  }
}
</style>

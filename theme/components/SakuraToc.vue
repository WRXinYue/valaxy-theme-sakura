<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useFrontmatter } from 'valaxy'

const { viewScroll = false } = defineProps<{
  viewScroll?: boolean
}>()
const frontmatter = useFrontmatter()
const { t } = useI18n()
</script>

<template>
  <h2 v-if="frontmatter.toc !== false" font="serif black">
    {{ t('sidebar.toc') }}
  </h2>
  <div class="custom-container">
    <slot>
      <SakuraOutline v-if="frontmatter.toc !== false" :view-scroll="viewScroll" />
    </slot>
  </div>
</template>

<style lang="scss">
.toc-btn {
  color: var(--sakura-c-brand);
  background-color: white;
  z-index: var(--yun-z-toc-btn);
}
</style>

<script lang="ts" setup>
import { useFrontmatter, usePostTitle, useSiteStore } from 'valaxy'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const frontmatter = useFrontmatter()

const title = usePostTitle(frontmatter)
const site = useSiteStore()
</script>

<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component">
      <template #main-header>
        <slot name="header">
          <SakuraPageHeader :title="title || t('menu.archives')" :icon="frontmatter.icon || 'i-ri-archive-line'" :class="frontmatter.pageTitleClass" />
        </slot>
      </template>
      <template #main-content>
        <slot name="content">
          <SakuraTimeLine :posts="site.postList" />
        </slot>
      </template>
    </component>
  </RouterView>
</template>

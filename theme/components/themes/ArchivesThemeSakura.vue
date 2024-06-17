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
        <SakuraPageHeader :title="title || t('menu.archives')" :icon="frontmatter.icon || 'i-ri-archive-line'" :color="frontmatter.color" />
      </template>
      <template #main-content>
        <SakuraTimeLine :posts="site.postList" />
      </template>
    </component>
  </RouterView>
</template>

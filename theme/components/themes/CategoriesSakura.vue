<script lang="ts" setup>
import { computed } from 'vue'
import { useCategories, useFrontmatter, usePostTitle, useSiteStore } from 'valaxy'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { defineWebPage, useSchemaOrg } from '@unhead/schema-org'
import { useThemeConfig } from '../../composables'

useSchemaOrg([
  defineWebPage({
    '@type': 'CollectionPage',
  }),
])

const site = useSiteStore()
const frontmatter = useFrontmatter()
const themeConfig = useThemeConfig()

const { t } = useI18n()
const route = useRoute()
const curCategory = computed(() => (route.query.category || '') as string)
const categories = useCategories()

const posts = computed(() => {
  const list = site.postList.filter((post) => {
    if (post.categories && curCategory.value !== 'Uncategorized') {
      if (typeof post.categories === 'string')
        return post.categories === curCategory.value
      else
        return post.categories.join('/').startsWith(curCategory.value) && post.categories[0] === curCategory.value.split('/')[0]
    }
    if (!post.categories && curCategory.value === 'Uncategorized')
      return post.categories === undefined
    return false
  })
  return list
})

const title = usePostTitle(frontmatter)
</script>

<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component">
      <template #main-header>
        <SakuraPageHeader
          :title="title || t('menu.categories')"
          :sub-title="curCategory"
          :icon="frontmatter.icon || 'i-ri-tag-line'"
          :color="frontmatter.color"
          :cover="frontmatter.cover"
        />
      </template>
      <template #main-content>
        <div m="x-100" :class="themeConfig.animation && 'element-slide-up'">
          <div text="center" class="yun-text-light" p="2">
            {{ t('counter.categories', Array.from(categories.children).length) }}
          </div>
          <SakuraCategories :categories="categories.children" />

          <div class="pt-24px px-20px flex items-center text-$st-c-text">
            <div i-fa6-solid:water class="mr-1" /> 文章列表
          </div>

          <RouterView />
        </div>
      </template>

      <template #main-nav-before>
        <div v-if="curCategory" m="x-100">
          <SakuraPostList w="full" :posts="posts" />
        </div>
      </template>
    </component>
  </RouterView>
</template>

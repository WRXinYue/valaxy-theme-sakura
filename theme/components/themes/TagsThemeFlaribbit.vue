<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useFrontmatter, useInvisibleElement, usePostTitle, useSiteStore } from 'valaxy'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { defineWebPage, useSchemaOrg } from '@unhead/schema-org'
import { useSakuraTags, useThemeConfig } from '../../composables'

useSchemaOrg([
  defineWebPage({
    '@type': 'CollectionPage',
  }),
])

const route = useRoute()
const router = useRouter()
const themeConfig = useThemeConfig()

const { t } = useI18n()
const frontmatter = useFrontmatter()
const title = usePostTitle(frontmatter)
const { tags } = useSakuraTags({
  primary: themeConfig.value.colors?.primary || '',
})

const curTag = computed(() => route.query.tag as string || '')
const site = useSiteStore()

// const tags = useTags()

const posts = computed(() => {
  const list = site.postList.filter((post) => {
    if (post.tags) {
      if (typeof post.tags === 'string')
        return post.tags === curTag.value
      else
        return post.tags.includes(curTag.value)
    }
    return false
  })
  return list
})

const collapse = ref()
const { show } = useInvisibleElement(collapse)

function displayTag(tag: string) {
  router.push({
    query: {
      tag,
    },
  })

  show()
}
</script>

<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component">
      <template #main-header>
        <SakuraPageHeader
          :title="title || t('menu.tags')"
          :sub-title="curTag"
          :icon="frontmatter.icon || 'i-ri-tag-line'"
          :color="frontmatter.color"
          :cover="frontmatter.cover"
        />
      </template>
      <template #main-content>
        <div class="tags-margin-control">
          <div class="yun-text-light" text="center" p="2">
            {{ t('counter.tags', Array.from(tags).length) }}
          </div>

          <div class="items-end justify-center" flex="~ wrap" gap="1">
            <SakuraButton
              v-for="[key] in Array.from(tags).sort()" :key="key" :class="{ clicked: curTag === key.toString() }"
              @click="displayTag(key.toString())"
            >
              {{ key }}
            </SakuraButton>
          </div>

          <SakuraIconTextDivider icon="i-fa6-solid:water" text="文章列表" :divider="false" />

          <RouterView />
        </div>
      </template>

      <template #main-nav-before>
        <div v-if="curTag" class="tags-margin-control">
          <ArticleListThemeCard :posts="posts" />
        </div>
      </template>
    </component>
  </RouterView>
</template>

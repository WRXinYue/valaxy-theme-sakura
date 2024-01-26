<script setup>
import { computed, ref } from 'vue'
import { useFrontmatter, useInvisibleElement, usePostTitle, useSiteStore } from 'valaxy'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { defineWebPage, useSchemaOrg } from '@unhead/schema-org'
import { useSakuraTags, useThemeConfig } from '../composables'

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
const { tags, getTagStyle } = useSakuraTags({
  primary: themeConfig.value.colors?.primary,
})

const curTag = computed(() => route.query.tag || '')
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

function displayTag(tag) {
  router.push({
    query: {
      tag,
    },
  })

  show()
}

const title = usePostTitle(frontmatter)
</script>

<template>
  <Layout class="relative">
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
          <div class="yun-text-light" text="center" p="2">
            {{ t('counter.tags', Array.from(tags).length) }}
          </div>

          <div class="justify-center items-end" flex="~ wrap" gap="1">
            <SakuraLayoutPostTag
              v-for="[key, tag] in Array.from(tags).sort()"
              :key="key"
              :title="key"
              :count="tag.count"
              :style="getTagStyle(tag.count)"
              @click="displayTag(key.toString())"
            />
          </div>

          <RouterView />
        </template>

        <template #main-nav-before>
          <SakuraCard v-if="curTag" ref="collapse" m="t-4" w="full">
            <SakuraPostCollapse w="full" m="b-4" p="x-20 lt-sm:x-5" :posts="posts" />
          </SakuraCard>
        </template>
      </component>
    </RouterView>
  </Layout>
</template>

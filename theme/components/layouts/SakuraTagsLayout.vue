<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useFrontmatter, useInvisibleElement, usePostTitle, useSiteStore, useTags } from 'valaxy'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useSakuraTags } from '../../composables'

const route = useRoute()
const router = useRouter()
const frontmatter = useFrontmatter()
const site = useSiteStore()
const tags = useTags()
const title = usePostTitle(frontmatter)
const { t } = useI18n()
const { getTagStyle } = useSakuraTags()

const curTag = computed(() => route.query.tag as string || '')
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
        <slot name="header">
          <SakuraPageHeader
            :title="title || t('menu.tags')"
            :sub-title="curTag"
            :icon="frontmatter.icon || 'i-ri-tag-line'"
            :class="frontmatter.pageTitleClass"
            :cover="frontmatter.cover"
          />
        </slot>
      </template>
      <template #main-content>
        <slot name="tags">
          <div class="tags-margin-control">
            <div class="sakura-text-light" text="center" p="2">
              {{ t('counter.tags', Array.from(tags).length) }}
            </div>

            <div class="items-end justify-center" flex="~ wrap" gap="1">
              <SakuraButton
                v-for="([key, tag], index) in Array.from(tags).sort()"
                :key="key"
                class="sakura-tag-button"
                :style="getTagStyle(index)"
                :class="{ clicked: curTag === key.toString() }"
                @click="displayTag(key.toString())"
              >
                <span mx-1 inline-flex>{{ key }}</span>
                <span inline-flex text="xs">[{{ tag.count }}]</span>
              </SakuraButton>
            </div>

            <SakuraIconTextDivider icon="i-fa6-solid:water" text="文章列表" :divider="false" />
          </div>
        </slot>
      </template>

      <template #main-nav-before>
        <slot name="post">
          <div v-if="curTag" class="tags-margin-control">
            <ArticleListThemeCard :posts="posts" />
          </div>
        </slot>
      </template>
    </component>
  </RouterView>
</template>

<style lang="scss">
.sakura-tag-button {
  color: var(--sakura-tag-color) !important;
  background-color: var(--sakura-tag-bg-color);
  line-height: 1.75rem;
  transition:
    color 0.3s ease-in-out,
    border-color 0.2s ease-in-out;

  &:hover {
    color: var(--sakura-tag-color, var(--st-c-secondary)) !important;
    border-color: var(--sakura-tag-color, var(--st-c-secondary));
  }

  &.clicked {
    color: var(--sakura-tag-color, var(--st-c-secondary)) !important;
    border-color: var(--sakura-tag-color, var(--st-c-secondary));
  }

  &::before {
    content: '#';
  }
}
</style>

<script lang="ts" setup>
import { computed } from 'vue'
import { useCategories, useSiteStore } from 'valaxy'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const site = useSiteStore()

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
</script>

<template>
  <SakuraPage>
    <RouterView v-slot="{ Component }">
      <component :is="Component">
        <template #main-content>
          <slot name="content">
            <div>
              <div text="center" class="yun-text-light" p="2">
                {{ t('counter.categories', Array.from(categories.children).length) }}
              </div>
              <SakuraCategories :categories="categories.children" />
            </div>
          </slot>
        </template>

        <template #main-nav-before>
          <slot name="posts">
            <div v-if="curCategory">
              <SakuraPostListCard w="full" :posts="posts" />
            </div>
          <!-- <SakuraCard v-if="curCategory" class="post-collapse-container" m="t-4" w="full">
            <SakuraPostCollapse w="full" m="b-4" p="x-20 lt-sm:x-5" :posts="posts" />
          </SakuraCard> -->
          </slot>
        </template>
      </component>
    </RouterView>
  </SakuraPage>
</template>

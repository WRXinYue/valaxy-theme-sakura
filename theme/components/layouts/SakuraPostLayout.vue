<script lang="ts" setup>
import { computed } from 'vue'
import { useFrontmatter, useFullUrl, useSiteConfig } from 'valaxy'
import type { Article } from '@unhead/schema-org'
import { defineArticle, useSchemaOrg } from '@unhead/schema-org'
import { toDate } from 'date-fns'

const siteConfig = useSiteConfig()
const frontmatter = useFrontmatter()
const url = useFullUrl()

const showSponsor = computed(() => {
  if (typeof frontmatter.value.sponsor === 'boolean')
    return frontmatter.value.sponsor

  return siteConfig.value.sponsor.enable
})

const article: Article = {
  '@type': 'BlogPosting',
  'headline': frontmatter.value.title,
  'description': frontmatter.value.description,
  'author': [
    {
      name: siteConfig.value.author.name,
      url: siteConfig.value.author.link,
    },
  ],
  'datePublished': toDate(frontmatter.value.date || 0),
  'dateModified': toDate(frontmatter.value.updated || 0),
}

const image = frontmatter.value.image || frontmatter.value.cover
if (image)
  article.image = image

useSchemaOrg(
  defineArticle(article),
)
</script>

<template>
  <SakuraArticle>
    <template v-if="$slots.left" #left>
      <slot name="left" />
    </template>
    <template #content>
      <slot name="content">
        <RouterView v-slot="{ Component }">
          <component :is="Component">
            <template #main-content-after>
              <YunSponsor v-if="showSponsor" />
              <ValaxyCopyright v-if="frontmatter.copyright || siteConfig.license.enabled" :url="url" />
            </template>
            <template #footer>
              <SakuraArticleFooterCustom />
            </template>
          </component>
        </RouterView>
      </slot>
    </template>
    <template #right>
      <slot name="right">
        <SakuraAsideLayout>
          <SakuraToc />
        </SakuraAsideLayout>
      </slot>
    </template>
  </SakuraArticle>
</template>

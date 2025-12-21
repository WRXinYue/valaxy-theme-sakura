<script lang="ts" setup>
import { defineArticle, useSchemaOrg } from '@unhead/schema-org/vue'
import { formatDate, useFrontmatter, useFullUrl, useSiteConfig, useValaxyI18n } from 'valaxy'
import { computed } from 'vue'

const siteConfig = useSiteConfig()
const frontmatter = useFrontmatter()
const url = useFullUrl()
const { $t, $tO } = useValaxyI18n()

const showSponsor = computed(() => {
  if (typeof frontmatter.value.sponsor === 'boolean')
    return frontmatter.value.sponsor

  return siteConfig.value.sponsor.enable
})

const article: Parameters<typeof defineArticle>[0] = {
  '@type': 'BlogPosting',
  'headline': $tO(frontmatter.value.title),
  'description': $tO(frontmatter.value.description),
  'author': [
    {
      name: $t(siteConfig.value.author.name),
      url: siteConfig.value.author.link,
    },
  ],
  'datePublished': formatDate(frontmatter.value.date || 0),
  'dateModified': formatDate(frontmatter.value.updated || 0),
  'image': frontmatter.value.image || frontmatter.value.cover,
}

useSchemaOrg(
  defineArticle(article),
)
</script>

<template>
  <SakuraPost>
    <RouterView v-slot="{ Component }">
      <component :is="Component">
        <template #main-content-after>
          <SakuraSponsor v-if="showSponsor" />
          <ValaxyCopyright v-if="frontmatter.copyright || siteConfig.license.enabled" :url="url" />
        </template>
        <template #footer>
          <SakuraPostFooter />
        </template>
      </component>
    </RouterView>
  </SakuraPost>
</template>

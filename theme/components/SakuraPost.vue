<script lang="ts" setup>
import type { Article } from '@unhead/schema-org'
import { defineArticle, useSchemaOrg } from '@unhead/schema-org/vue'
import { formatDate, useFrontmatter, useFullUrl, useSiteConfig } from 'valaxy'
import { computed } from 'vue'

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
  'datePublished': formatDate(frontmatter.value.date || 0),
  'dateModified': formatDate(frontmatter.value.updated || 0),
  'image': frontmatter.value.image || frontmatter.value.cover,
}

useSchemaOrg(
  defineArticle(article),
)
</script>

<template>
  <SakuraPage class="sakura-post">
    <template #header>
      <SakuraPostHeader :fm="frontmatter" />
    </template>

    <template v-if="$slots.left" #left>
      <slot name="left" />
    </template>
    <template #content>
      <slot name="content">
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
      </slot>
    </template>
    <template #right>
      <slot name="right">
        <SakuraAside>
          <SakuraToc />
        </SakuraAside>
      </slot>
    </template>
  </SakuraPage>
</template>

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-post {
  .sakura-page-content {
    max-width: 800px;
    padding-block: 24px;
  }

  .sakura-triple-columns {
    @include screen('md') {
      grid-template-columns: 150px minmax(0, 800px) 150px !important;
    }

    @include screen('lg') {
      grid-template-columns: 250px minmax(0, 800px) 250px !important;
    }
  }
}
</style>

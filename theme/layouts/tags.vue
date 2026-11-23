<script setup lang="ts">
import { defineWebPage, useSchemaOrg } from '@unhead/schema-org/vue'
import { useSiteStore } from 'valaxy'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useSakuraTags } from '../composables'

const route = useRoute()
const router = useRouter()
const site = useSiteStore()
const { t } = useI18n()
const { tags, getTagStyle } = useSakuraTags()

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

function displayTag(tag: string) {
  router.push({
    query: {
      ...route.query,
      tag: tag === curTag.value
        ? undefined
        : tag,
    },
  })
}

useSchemaOrg([
  defineWebPage({
    '@type': 'CollectionPage',
  }),
])
</script>

<template>
  <SakuraPage>
    <RouterView v-slot="{ Component }">
      <component :is="Component">
        <template #main-content>
          <slot name="content">
            <div class="sakura-browse-content sakura-safe-padding">
              <p id="sakura-tags-count" class="tag-summary">
                {{ t('counter.tags', tags.size) }}
              </p>
              <div class="tag-list" role="group" aria-labelledby="sakura-tags-count">
                <button
                  v-for="([key, tag], index) in Array.from(tags).sort()"
                  :key="key"
                  type="button"
                  class="tag-button"
                  :style="getTagStyle(index)"
                  :aria-pressed="curTag === key"
                  @click="displayTag(key)"
                >
                  <span class="tag-hash" aria-hidden="true">#</span>
                  <span>{{ key }}</span>
                  <span class="tag-count">{{ tag.count }}</span>
                </button>
              </div>
            </div>
          </slot>
        </template>

        <template #main-nav-before>
          <slot name="post">
            <div v-if="curTag" class="sakura-browse-content sakura-safe-padding tag-results">
              <SakuraPostList :posts :text="`# ${curTag}`" icon="i-ri-price-tag-3-line" />
            </div>
          </slot>
        </template>
      </component>
    </RouterView>
  </SakuraPage>
</template>

<style scoped>
.tag-summary {
  margin: 0 0 1rem;
  color: var(--sakura-color-text-muted);
  font-size: 0.875rem;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
}

.tag-button {
  --accent: var(--sakura-tag-color, var(--sakura-color-primary));

  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  max-width: 100%;
  min-height: 2.5rem;
  padding: 0.35rem 0.85rem;
  border: 1px solid var(--sakura-color-divider);
  border-radius: 2rem;
  background: var(--sakura-card-bg);
  color: var(--sakura-color-text);
  overflow-wrap: anywhere;
  transition:
    background-color 0.2s,
    border-color 0.2s;
}

.tag-button:hover,
.tag-button[aria-pressed='true'] {
  border-color: var(--accent);
  background: var(--sakura-tag-bg, color-mix(in srgb, var(--accent) 12%, var(--sakura-card-bg)));
}

.tag-button[aria-pressed='true'] {
  box-shadow: inset 0 0 0 1px var(--accent);
  font-weight: 700;
}

.tag-button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.tag-hash {
  color: var(--accent);
}

.tag-count {
  padding-inline: 0.45rem;
  border-radius: 1rem;
  background: var(--sakura-color-muted-background);
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
}

.tag-results {
  padding-top: 0;
}
</style>

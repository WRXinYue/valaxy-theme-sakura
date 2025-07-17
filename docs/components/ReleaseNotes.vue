<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import { formatDate } from 'valaxy'

const md = new MarkdownIt({
  html: true,
  linkify: true,
})
const releases = ref<{
  tag_name: string
  published_at: string
  body: string
  html?: string
}[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

async function fetchReleases() {
  try {
    isLoading.value = true
    const response = await fetch(
      'https://api.github.com/repos/WRXinYue/valaxy-theme-sakura/releases',
    )
    if (!response.ok)
      throw new Error('Failed to fetch releases')
    const data = await response.json()
    releases.value = data.map((release: any) => ({
      ...release,
      html: md.render(release.body),
    }))
  }
  catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
  }
  finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchReleases()
})
</script>

<template>
  <div class="release-notes">
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <template v-else>
      <section
        v-for="release in releases"
        :key="release.tag_name"
        class="release"
      >
        <h2>
          <a :href="`https://github.com/WRXinYue/valaxy-theme-sakura/releases/tag/${release.tag_name}`" target="_blank">
            {{ release.tag_name }}
          </a>
          <span class="date"> - {{ formatDate(release.published_at) }}</span>
        </h2>
        <div
          class="markdown-body"
          v-html="release.html"
        />
      </section>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.release-notes {
  margin-block: 30px;
}
</style>

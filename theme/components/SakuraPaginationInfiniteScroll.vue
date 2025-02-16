<script lang="ts" setup>
import { usePostList, useSiteConfig } from 'valaxy'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useThemeConfig } from '../composables'
import { useSakuraAppStore } from '../stores'

const siteConfig = useSiteConfig()
const sakura = useSakuraAppStore()
const themeConfig = useThemeConfig()
const routes = usePostList({ type: '' })

const pagination = themeConfig.value.pagination

const pageSize = computed(() => pagination?.itemsPerPage || siteConfig.value.pageSize)
const posts = computed(() => routes.value)
const identification = computed(() => pagination?.animation ? 'sakura-fade-up' : 'identification') // Determine the class identifier; if animation is enabled, use the class with animation

const totalPages = ref(Math.ceil(posts.value.length / pageSize.value))

function loadMoreContent() {
  if (sakura.loadMultiple < totalPages.value) {
    sakura.loadMultiple += 1
    if (pagination?.animation || pagination?.infiniteScrollOptions?.preload)
      registerTargets()
  }
}

function applySlideUpAnimation(entries: IntersectionObserverEntry[], _observer: IntersectionObserver) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains(identification.value)) {
      entry.target.classList.add(identification.value)
      sakura.paginationElementPositionsNumber += 1

      // Preload content before reaching end to ensure smooth user experience
      if (sakura.paginationElementPositionsNumber === sakura.paginationTargets.length - 1
        && pagination?.infiniteScrollOptions?.preload) {
        loadMoreContent()
      }
    }
  })
}

function registerTargets() {
  setTimeout(() => {
    sakura.paginationTargets = Array.from(document.querySelectorAll('.article-list'))

    for (let i = sakura.paginationElementPositionsNumber; i < sakura.paginationTargets.length; i++) {
      const target = document.getElementById(`article-${i}`)

      if (target === null) {
        console.error(`Element with ID 'article-${i}' not found. This may prevent preload from working properly.`)
        return
      }

      if (pagination?.animation)
        target.classList.add('op-0')

      sakura.paginationObserver!.observe(target)
    }
  }, 0)
}

function unregisterTargets() {
  sakura.paginationTargets.forEach((target) => {
    sakura.paginationObserver?.unobserve(target)
  })
}

onMounted(() => {
  if (pagination?.animation || pagination?.infiniteScrollOptions?.preload) {
    // Preventing flicker at animation start
    if (sakura.paginationTargets.length === 0) {
      sakura.paginationObserver = new IntersectionObserver(applySlideUpAnimation, {
        threshold: pagination.infiniteScrollOptions?.threshold ?? 0.01,
      })
    }
    registerTargets()
  }
})

onUnmounted(() => {
  unregisterTargets()
})
</script>

<template>
  <nav class="sakura-pagination-scroll mb-17 mt-20 flex justify-center">
    <button v-if="sakura.loadMultiple < totalPages" class="load-more-button px-8 py-2" @click="loadMoreContent">
      Previous
    </button>
    <div v-else class="text-center">
      很高兴你翻到这里，但是真的没有了...
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.load-more-button {
  border: 1px solid var(--sakura-color-divider);
  border-radius: 50px;
  transition:
    color 0.2s ease-out,
    border 0.2s ease-out,
    opacity 0.2s ease-out;
}

.load-more-button:hover {
  color: var(--sakura-color-primary);
  border-color: var(--sakura-color-primary);
}
</style>

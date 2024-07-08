<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { usePostList, useSiteConfig } from 'valaxy'
import { useSakuraAppStore } from '../../stores'
import { useThemeConfig } from '../../composables'

const siteConfig = useSiteConfig()
const sakura = useSakuraAppStore()
const themeConfig = useThemeConfig()
const routes = usePostList({ type: '' })

const pageSize = computed(() => themeConfig.value.pagination?.itemsPerPage || siteConfig.value.pageSize)
const posts = computed(() => routes.value)
const identification = computed(() => themeConfig.value.pagination?.animation ? 'animation-fade-up' : 'identification') // Determine the class identifier; if animation is enabled, use the class with animation

const totalPages = ref(Math.ceil(posts.value.length / pageSize.value))

function loadMoreContent() {
  if (sakura.loadMultiple < totalPages.value) {
    sakura.loadMultiple += 1
    if (themeConfig.value.pagination?.animation || themeConfig.value.pagination?.infiniteScrollOptions?.preload)
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
        && themeConfig.value.pagination?.infiniteScrollOptions?.preload)
        loadMoreContent()
    }
  })
}

function registerTargets() {
  setTimeout(() => {
    sakura.paginationTargets = Array.from(document.querySelectorAll('.sakura-article'))

    for (let i = sakura.paginationElementPositionsNumber; i < sakura.paginationTargets.length; i++) {
      const target = document.getElementById(`sakura-article-${i}`)

      if (target === null) {
        console.error(`Element with ID 'sakura-article-${i}' not found. This may prevent preload from working properly.`)
        return
      }

      if (themeConfig.value.pagination?.animation)
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
  if (themeConfig.value.pagination?.animation || themeConfig.value.pagination?.infiniteScrollOptions?.preload) {
    // Preventing flicker at animation start
    if (sakura.paginationTargets.length === 0) {
      sakura.paginationObserver = new IntersectionObserver(applySlideUpAnimation, {
        threshold: themeConfig.value.pagination.infiniteScrollOptions?.threshold ?? 0.01,
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
  <nav class="load-more-container flex justify-center mt-20 mb-17">
    <button v-if="sakura.loadMultiple < totalPages" class="load-more-button px-8 py-2" @click="loadMoreContent">
      Previous
    </button>
    <div v-else class="text-center">
      很高兴你翻到这里，但是真的没有了...
    </div>
  </nav>
</template>

<style lang="scss">
.load-more-container {
  color: var(--st-c-text-secondary);
}

.load-more-button {
  border: 1px solid #d6d6d6;
  border-radius: 50px;
  transition: color .2s ease-out, border .2s ease-out, opacity .2s ease-out;
}

.load-more-button:hover {
  color: #FE9600;
  border-color: #FE9600;
}
</style>

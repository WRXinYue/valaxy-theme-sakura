<script lang="ts" setup>
import { isEmptyAddon } from 'valaxy'
import * as addonWaline from 'valaxy-addon-waline'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const comments = ref<any[]>([])
const loading = ref(true)
const containerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
let resizeObserver: ResizeObserver | null = null

const router = useRouter()

// Check if addon is enabled
const hasWaline = computed(() => !isEmptyAddon(addonWaline))
const addon = hasWaline.value ? addonWaline.useAddonWaline() : null

const serverURL = computed(() => addon?.value?.options?.serverURL)

onMounted(async () => {
  if (contentRef.value && containerRef.value) {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (containerRef.value) {
          containerRef.value.style.height = `${entry.contentRect.height}px`
        }
      }
    })
    resizeObserver.observe(contentRef.value)
  }

  if (serverURL.value) {
    try {
      // Waline API: /comment?type=recent&count=5
      const res = await fetch(`${serverURL.value}/comment?type=recent&count=5`)
      const data = await res.json()
      // Waline V2 returns array directly or { data: [...] }
      comments.value = Array.isArray(data) ? data : (data.data || [])
    }
    catch (e) {
      console.error('Failed to fetch recent comments:', e)
    }
    finally {
      loading.value = false
    }
  }
  else {
    loading.value = false
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})

function formatTime(time: string) {
  if (!time)
    return ''
  return new Date(time).toLocaleDateString()
}

function getCommentContent(html: string) {
  if (!html)
    return ''
  if (typeof DOMParser === 'undefined') {
    return html.replace(/<[^>]+>/g, '').trim()
  }
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  let content = ''

  const traverse = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      content += node.textContent
    }
    else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element
      if (el.tagName.toLowerCase() === 'img') {
        const src = el.getAttribute('src')
        const alt = el.getAttribute('alt') || 'image'
        const title = el.getAttribute('title') || ''
        const isEmoji = el.classList.contains('wl-emoji')

        const cls = isEmoji ? 'sakura-comment-emoji' : 'sakura-comment-image'
        content += `<img src="${src}" alt="${alt}" title="${title}" class="${cls}" />`
      }
      else {
        node.childNodes.forEach(traverse)
      }
    }
  }

  traverse(doc.body)
  return content.trim()
}

function getArticleTitle(url: string) {
  try {
    const urlObj = new URL(url, 'http://dummy.com')
    const path = urlObj.pathname

    const route = router.resolve(path)
    if (route && route.matched.length > 0 && route.name !== 'NotFound') {
      const title = (route.meta?.frontmatter as any)?.title || route.meta?.title
      if (title)
        return title
    }
  }
  catch (e) {
    console.error(e)
  }
  return ''
}
</script>

<template>
  <SakuraSidebarCard v-if="hasWaline && serverURL" class="sakura-sidebar-comments" icon="i-ri-chat-1-line" title="Latest Comments">
    <div
      ref="containerRef"
      class="comments-transition-container"
    >
      <div ref="contentRef" class="comments-content-wrapper">
        <SakuraLoading v-if="loading" />

        <div v-else-if="comments.length > 0" class="sidebar-comment-list">
          <div v-for="comment in comments" :key="comment.objectId" class="sidebar-comment-item py-2">
            <div class="mb-1 flex items-center">
              <img v-if="comment.avatar" :src="comment.avatar" class="mr-2 h-6 w-6 rounded-full" alt="avatar">
              <span class="sidebar-comment-nick flex-1 truncate font-bold">{{ comment.nick }}</span>
              <span class="text-xs opacity-50">{{ formatTime(comment.insertedAt || comment.time) }}</span>
            </div>
            <a :href="`${comment.url}#${comment.objectId}`" class="sidebar-comment-content block truncate opacity-80" v-html="getCommentContent(comment.comment)" />
            <div v-if="getArticleTitle(comment.url)" class="mt-1 truncate text-right text-xs opacity-50">
              From: {{ getArticleTitle(comment.url) }}
            </div>
          </div>
        </div>

        <div v-else class="py-4 text-center text-sm opacity-50">
          No comments yet.
        </div>
      </div>
    </div>
  </SakuraSidebarCard>
</template>

<style lang="scss" scoped>
.comments-transition-container {
  overflow: hidden;
  position: relative;

  /* Start with a small height for loading state */
  min-height: 60px;
  transition: height 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.sidebar-comment-item {
  border-bottom: 1px dashed var(--sakura-color-divider);

  &:last-child {
    border-bottom: none;
  }
}

.sidebar-comment-nick {
  font-size: 0.85rem;
}

.sidebar-comment-content {
  color: var(--sakura-color-text);
  transition: color 0.3s;
  font-size: 0.85rem;

  &:hover {
    color: var(--sakura-color-primary);
  }
}

:deep(.sakura-comment-emoji) {
  display: inline-block;
  height: 1.2em;
  width: auto;
  margin: 0 0.1em;
  vertical-align: text-bottom;
}

:deep(.sakura-comment-image) {
  display: inline-block;
  max-height: 1.5em;
  width: auto;
  margin: 0 0.2em;
  vertical-align: middle;
  border-radius: 4px;
}
</style>

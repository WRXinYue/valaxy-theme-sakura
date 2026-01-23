<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const isLoading = ref(true)
let resizeObserver: ResizeObserver | null = null
let mutationObserver: MutationObserver | null = null

const TRANSITION_DURATION = '0.5s'
const TRANSITION_EASING = 'cubic-bezier(0.25, 0.1, 0.25, 1)'

onMounted(() => {
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

  const metingElement = contentRef.value?.querySelector('meting-js')
  if (metingElement) {
    if (metingElement.querySelector('.aplayer')) {
      isLoading.value = false
    }
    else {
      mutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node instanceof HTMLElement && (node.classList.contains('aplayer') || node.querySelector('.aplayer'))) {
                isLoading.value = false
                mutationObserver?.disconnect()
              }
            })
          }
        }

        if (metingElement.querySelector('.aplayer')) {
          isLoading.value = false
          mutationObserver?.disconnect()
        }
      })

      mutationObserver.observe(metingElement, {
        childList: true,
        subtree: true,
      })
    }
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  mutationObserver?.disconnect()
})
</script>

<template>
  <SakuraSidebarCard class="sakura-sidebar-music" icon="i-ri-music-2-line" title="Music">
    <div
      ref="containerRef"
      class="music-transition-container"
      :style="{ transition: `height ${TRANSITION_DURATION} ${TRANSITION_EASING}` }"
    >
      <div ref="contentRef" class="music-content-wrapper">
        <div v-if="isLoading" class="music-loading">
          <SakuraLoading />
        </div>
        <MetingJs
          id="2489775340"
          server="netease"
          type="playlist"
          theme="var(--sakura-color-primary)"
          list-max-height="300px"
          :class="{ 'opacity-0': isLoading }"
          class="transition-opacity duration-500"
        />
      </div>
    </div>
  </SakuraSidebarCard>
</template>

<style lang="scss">
.sakura-sidebar-music {
  .music-transition-container {
    overflow: hidden;
    position: relative;
    min-height: 90px;
  }

  .music-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    background-color: oklch(100% 0 0 / 50%);
  }

  meting-js {
    width: 100%;
    display: block;

    .aplayer {
      margin: 0 !important;
      box-shadow: none !important;
      font-family: inherit !important;

      &.aplayer-withlist {
        .aplayer-icon-menu {
          display: none !important;
        }
      }

      .aplayer-body {
        background-color: transparent !important;
      }

      .aplayer-list {
        border-color: transparent !important;

        ol {
          &::-webkit-scrollbar {
            width: 4px;
          }

          &::-webkit-scrollbar-thumb {
            background-color: var(--sakura-color-primary-light);
            border-radius: 2px;
          }
        }

        li {
          border-bottom: 1px solid oklch(0% 0 0 / 5%) !important;

          &:hover {
            background-color: oklch(from var(--sakura-color-primary) l c h / 10%) !important;
          }

          &.aplayer-list-light {
            background-color: oklch(from var(--sakura-color-primary) l c h / 20%) !important;
          }
        }
      }
    }
  }
}
</style>

<script lang="ts" setup>
import { useRuntimeConfig } from 'valaxy'
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'

const runtimeConfig = useRuntimeConfig()

const hasWaline = computed(() => runtimeConfig.value.addons['valaxy-addon-waline'])
const hasTwikoo = computed(() => runtimeConfig.value.addons['valaxy-addon-twikoo'])

const currentCommentSystem = ref<'waline' | 'twikoo'>()

const showCommentToggle = computed(() => hasWaline.value && hasTwikoo.value)

function toggleCommentSystem(value: 'waline' | 'twikoo') {
  currentCommentSystem.value = value
  localStorage.setItem('currentCommentSystem', value)
}

onMounted(() => {
  currentCommentSystem.value = localStorage.getItem('currentCommentSystem') as 'waline' | 'twikoo' || 'waline'
})

const SakuraWaline = hasWaline.value
  ? defineAsyncComponent(() => import('./plugins/SakuraWaline.vue'))
  : () => null
const SakuraTwikoo = hasTwikoo.value
  ? defineAsyncComponent(() => import('./plugins/SakuraTwikoo.vue'))
  : () => null
</script>

<template>
  <SakuraCard v-if="hasWaline || hasTwikoo" w="full" class="sakura-comment" mt-6>
    <ClientOnly>
      <div v-if="showCommentToggle" class="sakura-comment-toggle mb-4 mt-5 flex justify-center">
        <button class="sakura-comment-button" :class="[{ active: currentCommentSystem === 'waline' }]" @click="toggleCommentSystem('waline')">
          Waline
        </button>
        <button class="sakura-comment-button" :class="[{ active: currentCommentSystem === 'twikoo' }]" @click="toggleCommentSystem('twikoo')">
          Twikoo
        </button>
      </div>

      <SakuraWaline v-if="hasWaline" v-show="!showCommentToggle || currentCommentSystem === 'waline'" />
      <SakuraTwikoo v-if="hasTwikoo" v-show="!showCommentToggle || currentCommentSystem === 'twikoo'" />
      <slot />
    </ClientOnly>
  </SakuraCard>
</template>

<style lang="scss" scoped>
.sakura-comment {
  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h5 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h6 {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  ul {
    list-style: disc;
    margin-left: 1rem;
    margin-bottom: 1rem;
  }

  ol {
    list-style: decimal;
    margin-left: 1rem;
    margin-bottom: 1rem;
  }
}

.sakura-comment-toggle {
  overflow: hidden;
  border-radius: 0.375rem;
}

.sakura-comment-button {
  padding: 0.1rem 1rem;
  border: none;
  color: var(--sakura-text-muted-color);
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #e0e0e0;
  }

  &.active {
    background-color: var(--sakura-primary-color);
    color: white;
  }
}
</style>

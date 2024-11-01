<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFuseSearch } from 'valaxy'
import { useScrollLock } from '../composables'

const props = defineProps<{
  open: boolean
}>()
const emit = defineEmits(['close'])

const input = ref()

const isLocked = useScrollLock()
const { results } = useFuseSearch(input)
const { t } = useI18n()

const searchContainer = ref<HTMLElement>()
const searchInputRef = ref<HTMLInputElement>()

watch(() => props.open, async () => {
  if (!props.open)
    return

  searchInputRef.value?.focus()
})
</script>

<template>
  <Transition name="fade" @enter="isLocked = true" @after-leave="isLocked = false">
    <div v-if="open" ref="searchContainer" class="sakura-search">
      <div class="flex-center sakura-search-container" w="full">
        <input ref="searchInputRef" v-model="input" class="sakura-search-input" :placeholder="t('search.placeholder')">
      </div>
      <div v-if="input" py="4">
        {{ t('search.hits', results.length || 0) }}
      </div>
      <div v-if="results.length > 0" overflow="auto" flex="~" w="full">
        <div class="sakura-search-result" flex="~ col" w="full">
          <AppLink
            v-for="result in results" :key="result.item.title" :to="result.item.link"
            class="sakura-search-result-item" flex="~ col" @click="emit('close')"
          >
            <h3 class="sakura-search-result-title" font="serif black">
              {{ result.item.title }}
            </h3>
            <span class="sakura-search-result-excerpt" text="sm" opacity="80">
              {{ result.item.excerpt }}
            </span>
            <span class="sakura-search-result-score" text-xs opacity-50 mt="1">
              Score Index: {{ result.refIndex }}
            </span>
          </AppLink>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
.sakura-search {
  position: fixed;
  inset: 0;
  backdrop-filter: blur(30px);
  text-align: center;
  padding-top: 2.4rem;
  margin: 0;
  z-index: 150;
  background-color: var(--sakura-bg-color);
  overflow-y: scroll;
  pointer-events: auto;
  transition: color 0.2s ease;

  &-input {
    background: transparent;
    color: var(--sakura-text-color);
    font-size: 1.5rem;
    border-radius: 3rem;
    padding: 1rem 1.5rem;
    border: 1px solid var(--sakura-border-color);
    box-sizing: border-box;
    width: 90%;
    max-width: 800px;
    font-weight: 900;
    text-align: center;
    transition: all 0.2s;

    &:focus {
      border-color: var(--sakura-primary-color);
    }
  }

  &-result-item {
    padding: 0.5rem;
    color: var(--sakura-text-color);
    cursor: pointer;
    border-top: 1px dashed #ccc;

    &:hover {
      color: var(--sakura-primary-text-color);
    }
  }
}
</style>

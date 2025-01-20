<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import iloliImg from '../assets/iloli.gif'
import { useScrollLock, useSearch } from '../composables'

const props = defineProps<{
  open: boolean
}>()

const isLocked = useScrollLock()
const search = useSearch()
const router = useRouter()
const { t } = useI18n()

const input = ref()
const searchContainer = ref<HTMLElement>()
const searchInputRef = ref<HTMLInputElement>()

watch(() => props.open, async () => {
  if (!props.open)
    return

  setTimeout(() => {
    searchInputRef.value?.focus()
  }, 0)
})

function toSearch() {
  router.push({ path: '/search', query: { q: input.value } })
  search.close()
}
</script>

<template>
  <Transition name="fade" @enter="isLocked = true" @after-leave="isLocked = false">
    <div v-if="open" ref="searchContainer" class="mashiro-search" :style="{ '--sakura-search-bg-img': `url('${iloliImg}')` }">
      <div class="mashiro-search-container">
        <p> 想要找点什么呢？</p>
        <div class="flex-center relative my-4" flex="~" rounded>
          <div class="i-fa-search absolute left-0 pl-12" />
          <input ref="searchInputRef" v-model="input" class="mashiro-search-input" :placeholder="t('search.placeholder')" @keyup.enter="toSearch">
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.mashiro-search {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  backdrop-filter: blur(30px);
  padding-top: 2.4rem;
  margin: 0;
  z-index: 150;
  background-color: var(--sakura-color-background);
  overflow-y: scroll;
  pointer-events: auto;
  transition: color 0.2s ease;
  animation: elastic 0.5s;
  background-image: var(--sakura-search-bg-img);
  background-repeat: no-repeat;
  background-position: bottom right;

  @keyframes elastic {
    0% {
      transform: scale(0);
    }

    55% {
      transform: scale(1);
    }

    70% {
      transform: scale(0.98);
    }

    100% {
      transform: scale(1);
    }
  }

  &-container {
    margin: 0 auto;
    width: 90%;
    height: 285px;
    max-width: 600px;
  }

  &-input {
    width: 100%;
    background: transparent;
    color: var(--sakura-color-text);
    font-size: 1.5rem;
    border-radius: 3rem;
    padding: 6px 24px 6px 50px;
    border: 1px solid var(--sakura-color-border);
    box-sizing: border-box;
    font-weight: 900;
    transition: all 0.2s;

    &:focus {
      border-color: var(--sakura-color-primary);
    }
  }

  &-result-item {
    padding: 0.5rem;
    color: var(--sakura-color-text);
    cursor: pointer;
    border-top: 1px dashed var(--sakura-color-divider);

    &:hover {
      color: var(--sakura-color-primary);
    }
  }
}
</style>

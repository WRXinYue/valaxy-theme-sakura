<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(defineProps<{
  themes: {
    name: string
    desc: string
    siteImage: string
    siteExampleUrl?: string
    tags?: string[]
  }[]
}>(), {})

const { t } = useI18n()
const keyword = ref('')
const filteredThemes = computed(() => {
  return props.themes.filter((item) => {
    const lowerCaseKeyword = keyword.value.toLowerCase()
    return item.name.toLowerCase().includes(lowerCaseKeyword) || item.tags?.some(t => t.toLowerCase().includes(lowerCaseKeyword))
  })
})
</script>

<template>
  <div class="relative my-4 flex-center" flex="~" rounded>
    <div class="i-ri-search-line absolute text-slate-400 left-0 pl-12" />
    <input
      v-model="keyword"
      :placeholder="t('gallery.tip')"
      pl-10 pr-4
      class="focus:border-purple-500 b-2 w-full h-12"
      dark="border-dark-200"
      bg="bg-white dark:bg-dark-500"
      rounded-lg transition
      type="text" name="search"
    >
  </div>
  <div class="m-0! p-0! sm:grid-cols-1 lg:grid-cols-2 grid" gap="4">
    <div v-for="theme, i in filteredThemes" :key="i" class="w-fulls m-0!">
      <ArticleThemeGrid :title="theme.name" :link="theme.siteExampleUrl" :src="theme.siteImage" :excerpt="theme.desc" height />
    </div>
  </div>
</template>

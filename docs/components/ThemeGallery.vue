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
  <div class="flex-center relative my-4" flex="~" rounded>
    <div class="i-ri-search-line absolute left-0 pl-12 text-slate-400" />
    <input
      v-model="keyword"
      :placeholder="t('gallery.tip')"

      class="h-12 w-full b-2 focus:border-purple-500"
      dark="border-dark-200"
      bg="bg-white dark:bg-dark-500"
      rounded-lg pl-10 pr-4 transition
      type="text" name="search"
    >
  </div>
  <div class="grid lg:grid-cols-2 sm:grid-cols-1 m-0! p-0!" gap="4">
    <div v-for="theme, i in filteredThemes" :key="i" class="w-fulls m-0!">
      <ArticleThemeGrid :title="theme.name" :link="theme.siteExampleUrl" :src="theme.siteImage" :excerpt="theme.desc" height />
    </div>
  </div>
</template>

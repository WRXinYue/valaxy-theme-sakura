<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export interface ValaxyAddon {
  icon: string
  name: string
  repo: string
  desc: string
  siteImage: string
  siteExampleUrl?: string
  tags?: string[]
}

const props = withDefaults(defineProps<{
  addons: ValaxyAddon[]
}>(), {})

const { t } = useI18n()
const keyword = ref('')
const filteredAddons = computed(() => {
  return props.addons.filter((item) => {
    return item.name.includes(keyword.value) || item.tags?.some(t => t.includes(keyword.value))
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
  <ul class="grid lg:grid-cols-2 sm:grid-cols-1 m-0! p-0!" gap="4">
    <li v-for="addon, i in filteredAddons" :key="i" class="w-full list-none m-0!">
      <AddonGalleryCard :addon="addon" />
    </li>
  </ul>
</template>

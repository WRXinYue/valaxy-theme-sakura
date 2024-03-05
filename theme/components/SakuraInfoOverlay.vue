<script setup lang="ts">
import { useSiteConfig } from 'valaxy'
import { useThemeConfig } from '../composables'

const props = defineProps({
  currentIndex: {
    type: Number,
    required: true,
  },
})

const emits = defineEmits(['updateIndex'])

const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()

function nextMedia() {
  let newIndex = props.currentIndex
  if (newIndex < themeConfig.value.banner.urls.length - 1)
    newIndex++
  else
    newIndex = 0

  emits('updateIndex', newIndex)
}

function prevMedia() {
  let newIndex = props.currentIndex
  if (newIndex > 0)
    newIndex--
  else
    newIndex = themeConfig.value.banner.urls.length - 1

  emits('updateIndex', newIndex)
}
</script>

<template>
  <div class="info z-4">
    <SakuraGlitchText :text="themeConfig.banner.title" />
    <div class="w-full h-full rounded-2xl px-4 py-3" style="background-color: rgba(0, 0, 0, 0.5);">
      <SakuraMottoDisplay />
      <div class="flex justify-between mx-5 mt-4">
        <img class="icon" cursor-pointer rotate-180 src="../assets/next-b.svg" alt="Previous media" @click="prevMedia">
        <a v-for="s in siteConfig.social" :key="s.name" class="icon" :href="s.link" aria-label="icon" target="_blank">
          <div :class="[s.icon]" />
        </a>
        <img class="icon" cursor-pointer src="../assets/next-b.svg" alt="Next media" @click="nextMedia">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  height: 22px;
  width: 22px;
  color: var(--st-c-icon);
}
</style>

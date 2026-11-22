<script setup lang="ts">
import { useFrontmatter } from 'valaxy'
import { ref } from 'vue'

const { type } = defineProps<{
  type: string
}>()

const frontmatter = useFrontmatter()

const elements = frontmatter.value[type]

const showElements = ref(Array.from({ length: elements.length }).fill(false))

const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    copied.value = true
    clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => copied.value = false, 2000)
  }).catch((err) => {
    console.error('Failed to copy text: ', err)
  })
}
</script>

<template>
  <div v-if="copied" class="fixed left-1/2 top-4 z-50 rounded bg-black/80 px-3 py-1 text-sm text-white -translate-x-1/2">
    Copied to clipboard
  </div>
  <div v-if="type.includes('hvr')">
    <div class="gap-5">
      <div v-for="(element, idx) in elements" :key="idx" class="btn m-1" :class="element.class" @click="copyToClipboard(element.class)">
        {{ element.name || element.class }}
      </div>
    </div>
  </div>
  <div v-else>
    <div class="gap-5">
      <div
        v-for="(element, idx) in elements" :key="idx" class="m-1 inline-block cursor-pointer"
        @mouseover="showElements[idx] = true"
        @mouseleave="showElements[idx] = false"
      >
        <div class="btn m-1" :class="showElements[idx] && element.class" @click="copyToClipboard(element.class)">
          {{ element.name || element.class }}
        </div>
      </div>
    </div>
  </div>
</template>

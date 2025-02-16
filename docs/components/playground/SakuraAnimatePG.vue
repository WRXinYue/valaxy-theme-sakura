<script setup lang="ts">
import { useFrontmatter } from 'valaxy'
import { ref } from 'vue'
import { POSITION, useToast } from 'vue-toastification'

const { type } = defineProps<{
  type: string
}>()

const frontmatter = useFrontmatter()

const elements = frontmatter.value[type]

const showElements = ref(Array.from({ length: elements.length }).fill(false))

function copyToClipboard(text: string) {
  const toast = useToast()

  navigator.clipboard.writeText(text).then(() => {
    toast.success('Copied to clipboard', {
      position: POSITION.TOP_CENTER,
      timeout: 2000,
      closeButton: false,
      icon: {
        iconClass: 'i-fa6-solid-code!',
        iconTag: 'div',
      },
    })
  }).catch((err) => {
    console.error('Failed to copy text: ', err)
  })
}
</script>

<template>
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

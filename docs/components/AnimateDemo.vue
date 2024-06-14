<script setup lang="ts">
import { ref } from 'vue'
import { useFrontmatter } from 'valaxy'
import { POSITION, useToast } from 'vue-toastification'

const { type } = defineProps<{
  type: string
}>()

const frontmatter = useFrontmatter()

const elements = frontmatter.value[type]

const showElements = ref(Array(elements.length).fill(false))

// function setAllElements(value: boolean) {
//   showElements.value = Array(elements.length).fill(value)
// }

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
  <div v-if="type === 'hover-icons'">
    <div class="gap-5">
      <div
        v-for="(element, index) in elements"
        :key="index"
        class="btn m-1"
        :class="element.class"
        @click="copyToClipboard(element.class)"
      >
        {{ element.name || element.class }}
        <span class="i-simple-icons-icloud hvr-icon inline-block" />
      </div>
    </div>
  </div>
  <div v-else-if="type.includes('hover-')">
    <div class="gap-5">
      <div
        v-for="(element, index) in elements"
        :key="index"
        class="btn m-1"
        :class="element.class"
        @click="copyToClipboard(element.class)"
      >
        {{ element.name || element.class }}
      </div>
    </div>
  </div>
  <div v-else>
    <!-- <button @click="setAllElements(true)">
      Show All
    </button>
    <button @click="setAllElements(false)">
      Reset
    </button> -->
    <div class="gap-5">
      <div
        v-for="(element, index) in elements"
        :key="index"
        class="btn m-1"
        :class="showElements[index] && element.class"
        @click="showElements[index] = !showElements[index], copyToClipboard(element.class)"
      >
        {{ element.name || element.class }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import { useAppStore } from 'valaxy'
import { onMounted } from 'vue'

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@900&display=swap',
    },
  ],
})

const app = useAppStore()
onMounted(() => {
  app.showLoading = false
})
</script>

<template>
  <Transition name="fade">
    <YunLoading v-if="app.showLoading" />
  </Transition>
</template>

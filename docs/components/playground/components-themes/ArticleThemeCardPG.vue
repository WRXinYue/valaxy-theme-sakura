<script setup lang="ts">
import { usePostList } from 'valaxy'
import { ref } from 'vue'

const routes = usePostList()

const config = ref({
  post: routes.value[0],
  imagePosition: true,
})

function configUpdate(newConfig: any) {
  config.value = newConfig
}
</script>

<template>
  <PostThemeCard :post="config.post" :image-position="config.imagePosition" />
  <CodeEditor :config="config" @update:config="configUpdate" />
</template>

<script setup lang="ts">
import { usePostList } from 'valaxy'
import { ref } from 'vue'

const routes = usePostList()

const config = ref({
  post: routes.value[0],
})

function configUpdate(newConfig: any) {
  config.value = newConfig
}
</script>

<template>
  <PostThemeMinima :post="config.post" />
  <CodeEditor :config="config" @update:config="configUpdate" />
</template>

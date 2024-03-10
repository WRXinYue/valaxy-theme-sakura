<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  config: Object,
})

const emit = defineEmits(['update:config'])

const editorContainer = ref<HTMLElement | null>(null)
let editor: any = null

onMounted(async () => {
  if (editorContainer.value) {
    const monaco = await import('monaco-editor')
    editor = monaco.editor.create(editorContainer.value, {
      value: JSON.stringify(props.config, null, 2),
      language: 'json',
      theme: 'vs-dark',
    })

    editor.onDidChangeModelContent(() => {
      try {
        const updatedConfig = JSON.parse(editor.getValue())
        emit('update:config', updatedConfig)
      }
      catch (error) {
        console.error('解析 JSON 出错:', error)
      }
    })
  }
})

onBeforeUnmount(() => {
  editor?.dispose()
})
</script>

<template>
  <div class="language-ts vp-adaptive-theme pt-0! h-500px ">
    <pre class="shiki shiki-themes github-light github-dark vp-code pt-0! pb-0! overflow-y-hidden!">
      <div ref="editorContainer" class="editor-container h-500px" />
    </pre>
  </div>
</template>

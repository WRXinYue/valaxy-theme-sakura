<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  config: object
  height: string
}>(), {
  height: '500px',
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
  <div class="language-ts pt-0!" :style="{ height }">
    <pre class="p-0! m-0! overflow-hidden!">
      <div ref="editorContainer" class="editor-container" :style="{ height }" />
    </pre>
  </div>
</template>

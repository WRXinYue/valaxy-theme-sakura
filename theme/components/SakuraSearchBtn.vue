<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const props = withDefaults(defineProps<{
  open?: boolean
}>(), {
  open: false,
})

const emit = defineEmits(['close', 'open'])

const { t } = useI18n()

function onClick() {
  if (props.open)
    emit('close')
  else
    emit('open')
}
</script>

<template>
  <button class="sakura-icon-btn sakura-search-btn" :title="t('menu.search')" @click="onClick">
    <div v-if="!open" i-mdi-search />
    <div v-else text="!2xl" i-mdi-close />
  </button>
</template>

<style lang="scss">
.sakura-search-btn {
  z-index: 200;
}
</style>

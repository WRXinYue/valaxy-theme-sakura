<script lang="ts" setup>
import { computed } from 'vue'

import { useI18n } from 'vue-i18n'

const props = defineProps<{
  theme: 'brand' | 'alt'
  class: string
  icon: string
  link: string
  text: string
}>()

const classes = computed(() => {
  const arr = []
  if (props.theme === 'brand')
    arr.push('from-$st-c-brand', 'to-$st-c-secondary')
  else
    arr.push('from-gray-700', 'to-dark-300')

  return arr
})

const { t } = useI18n()
</script>

<template>
  <AppLink
    :to="link"
    :class="[classes, props.class]"
    class="btn transition rounded-$st-c-rd decoration-none text-white! flex items-center"
    bg="gradient-to-r"
  >
    {{ t(text) }}
    <div class="inline-flex hvr-icon ml-2" :class="icon" />
  </AppLink>
</template>

<style last="scss" scoped>
.btn:hover {
  filter: brightness(120%);
}
</style>

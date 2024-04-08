<script lang="ts" setup>
import { computed } from 'vue'

import { useI18n } from 'vue-i18n'

const props = defineProps<{
  theme: 'brand' | 'alt'
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
    m="2"
    :class="classes"
    class="btn transition rounded-full decoration-none text-white!"
    bg="gradient-to-r"
    p="x-6"
  >
    {{ t(text) }}
  </AppLink>
</template>

<style last="scss" scoped>
.btn:hover {
  filter: brightness(120%);
}
</style>

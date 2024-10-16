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
    arr.push('from-$sakura-primary-color', 'to-$sakura-primary-color')
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
    class="btn flex items-center rounded-$sakura-rd decoration-none transition text-white!"
    bg="gradient-to-r"
  >
    {{ t(text) }}
    <div class="hvr-icon ml-2 inline-flex" :class="icon" />
  </AppLink>
</template>

<style last="scss" scoped>
.btn:hover {
  filter: brightness(120%);
}
</style>

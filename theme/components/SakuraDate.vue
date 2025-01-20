<script lang="ts" setup>
import { formatDate } from 'valaxy'
import { computed } from 'vue'

const props = defineProps<{
  date?: Date | number | string
  itemprop?: string
  label?: string
}>()

const datetime = computed(() => formatDate(props.date ?? ''))
</script>

<template>
  <dl v-if="label">
    <dt class="sr-only">
      {{ props.label }}
    </dt>
    <dd>
      {{ datetime }}
    </dd>
  </dl>

  <time v-else :itemprop :datetime>{{ datetime }}</time>
</template>

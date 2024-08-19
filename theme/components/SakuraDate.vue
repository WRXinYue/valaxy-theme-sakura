<script lang="ts" setup>
import { formatDate } from 'valaxy'
import { computed } from 'vue'

const props = defineProps<{
  date?: Date | number | string
  itemprop?: string
}>()

const datetime = computed(() => formatDate(props.date || ''))
</script>

<template>
  <dl>
    <dt class="sr-only">
      Published on
    </dt>
    <dd>
      <time :itemprop :datetime="datetime">{{ datetime }}</time>
    </dd>
  </dl>
</template>

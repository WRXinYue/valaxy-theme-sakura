<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { type } = defineProps<{
  date: Date | number | string
  type?: 'posted' | 'edited'
}>()

const { t } = useI18n()

const itemprop = computed(() => t(type === 'posted' ? 'datePublished' : 'dateModified'))
const label = computed(() => t(type === 'posted' ? 'post.posted' : 'post.edited'))
</script>

<template>
  <div class="sakura-post-date">
    <AppLink class="posted-time whitespace-nowrap align-top" flex="inline items-center" :title="label + date">
      <span i-mdi:clock-outline class="sakura-icon mr-1 inline-block" />
      <span mr1>
        {{ label }}
      </span>
      <SakuraDate :date :itemprop :label class="inline-block" />
    </AppLink>
  </div>
</template>

<style lang="scss" scoped>
.sakura-post-date {
  & * {
    color: inherit;
    font-size: inherit;
    cursor: auto;
  }
}
</style>

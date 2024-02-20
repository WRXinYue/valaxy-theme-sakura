<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  /**
   * Cur Page Number
   */
  curPage: number
  /**
   * Total Pages
   */
  total: number
  /**
   * Page Size
   */
  pageSize: number
}>()

const emit = defineEmits(['loadMore'])

const totalPages = ref(Math.ceil(props.total / props.pageSize))

function loadMoreContent() {
  const nextPage = props.curPage + 1
  if (nextPage <= totalPages.value)
    emit('loadMore', nextPage)
}
</script>

<template>
  <nav class="load-more-container">
    <button v-if="curPage < totalPages" class="load-more-button" @click="loadMoreContent">
      加载更多
    </button>
  </nav>
</template>

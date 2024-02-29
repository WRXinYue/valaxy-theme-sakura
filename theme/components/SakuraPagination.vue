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
const nextPage = ref(props.curPage)

function loadMoreContent() {
  nextPage.value += 1
  if (nextPage.value <= totalPages.value)
    emit('loadMore', nextPage)
}
</script>

<template>
  <nav class="load-more-container flex justify-center mt-20 mb-17">
    <button v-if="nextPage < totalPages" class="load-more-button px-8 py-2" @click="loadMoreContent">
      Previous
    </button>
    <div v-else class="text-center">
      很高兴你翻到这里，但是真的没有了...
    </div>
  </nav>
</template>

<style lang="scss">
.load-more-container {
  color: #757575;
}

.load-more-button {
  border: 1px solid #d6d6d6;
  border-radius: 50px;
  transition: color .2s ease-out, border .2s ease-out, opacity .2s ease-out;
}

.load-more-button:hover {
  color: #FE9600;
  border-color: #FE9600;
}
</style>

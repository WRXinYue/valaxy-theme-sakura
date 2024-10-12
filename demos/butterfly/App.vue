<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(async () => {
  await import('ribbon.js')
})
</script>

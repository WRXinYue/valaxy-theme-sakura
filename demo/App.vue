<script lang="ts" setup>
import { onMounted } from 'vue'

/** Hidden ap.lrc */
function removelrc() {
  const lrcElement = document.querySelector('.aplayer-icon-lrc')
  if (lrcElement) {
    document.removeEventListener('DOMNodeInserted', removelrc)
    setTimeout(() => {
      (lrcElement as HTMLElement).click()
    }, 0)
  }
}

onMounted(() => {
  document.addEventListener('DOMNodeInserted', removelrc)
})
</script>

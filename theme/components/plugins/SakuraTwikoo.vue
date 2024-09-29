<script lang="ts" setup>
import { useTwikooWithOptions } from 'valaxy-addon-twikoo'

import 'valaxy-addon-twikoo/client/styles/index.scss'

useTwikooWithOptions()
</script>

<template>
  <div class="comment sakura-twikoo">
    <div id="tcomment" class="sakura-twikoo" w="full" />
  </div>
</template>

<style lang="scss">
.sakura-twikoo {
  .twikoo svg {
    color: var(--st-c-secondary);
  }

  .tk-action-link {
    color: var(--st-c-brand);
  }
}
</style>

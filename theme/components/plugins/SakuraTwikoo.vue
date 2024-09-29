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
/* stylelint-disable selector-class-pattern */

.sakura-twikoo {
  .twikoo svg {
    color: var(--st-c-secondary);
  }

  .tk-action-link {
    color: var(--st-c-brand);
  }

  .twikoo .el-button--primary.is-disabled {
    background: var(--st-c-brand);
    opacity: 0.6;

    &:hover {
      background: var(--st-c-brand);
      opacity: 0.8;
    }
  }

  .twikoo .el-button:not(.el-button--primary .el-button--text):active,
  .twikoo .el-button:not(.el-button--primary .el-button--text):focus,
  .twikoo .el-button:not(.el-button--primary .el-button--text):hover {
    color: var(--st-c-brand) !important;
    border-color: var(--st-c-secondary) !important;
  }
}
</style>

<script lang="ts" setup>
import * as addonTwikoo from 'valaxy-addon-twikoo'
import 'valaxy-addon-twikoo/client/styles/index.scss'
import { isEmptyAddon } from 'valaxy'

if (isEmptyAddon(addonTwikoo))
  throw new Error('Please install valaxy-addon-twikoo')

addonTwikoo.useTwikooWithOptions()
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
    color: var(--sakura-c-secondary);
  }

  .tk-action-link {
    color: var(--sakura-c-brand);
  }

  .twikoo .el-button--primary.is-disabled {
    background: var(--sakura-c-brand);
    opacity: 0.6;

    &:hover {
      background: var(--sakura-c-brand);
      opacity: 0.8;
    }
  }

  .twikoo .el-button:not(.el-button--primary .el-button--text):active,
  .twikoo .el-button:not(.el-button--primary .el-button--text):focus,
  .twikoo .el-button:not(.el-button--primary .el-button--text):hover {
    color: var(--sakura-c-brand) !important;
    border-color: var(--sakura-c-secondary) !important;
  }
}
</style>

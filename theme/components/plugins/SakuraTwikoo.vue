<script lang="ts" setup>
import { isEmptyAddon } from 'valaxy'
import * as addonTwikoo from 'valaxy-addon-twikoo'
import 'valaxy-addon-twikoo/client/styles/index.scss'

if (isEmptyAddon(addonTwikoo))
  throw new Error('Please install valaxy-addon-twikoo')

addonTwikoo.useTwikooWithOptions()
</script>

<template>
  <div class="comment sakura-twikoo">
    <div id="tcomment" class="sakura-twikoo" w="full" />
  </div>
</template>

<style lang="scss" scoped>
/* stylelint-disable selector-class-pattern */

.sakura-twikoo {
  .twikoo svg {
    color: var(--sakura-color-primary);
  }

  .tk-action-link {
    color: var(--sakura-color-primary);
  }

  .twikoo .el-button--primary.is-disabled {
    background: var(--sakura-color-primary);
    opacity: 0.6;

    &:hover {
      background: var(--sakura-color-primary);
      opacity: 0.8;
    }
  }

  .twikoo .el-button:not(.el-button--primary .el-button--text):active,
  .twikoo .el-button:not(.el-button--primary .el-button--text):focus,
  .twikoo .el-button:not(.el-button--primary .el-button--text):hover {
    color: var(--sakura-color-primary) !important;
    border-color: var(--sakura-color-primary) !important;
  }
}
</style>

<script setup lang="ts">
import { useSiteConfig } from 'valaxy'

defineProps<{
  favicon?: boolean
  title?: string | string[]
  hamburger?: boolean
}>()

const siteConfig = useSiteConfig()
</script>

<template>
  <div class="sakura-navbar-brand">
    <template v-if="favicon">
      <img class="h-40px w-40px" alt="logo" :src="siteConfig.favicon">
    </template>
    <template v-if="title">
      <RouterLink class="sakura-logo-link" to="/" :aria-label="siteConfig.title">
        <template v-if="typeof title === 'string'">
          <span mr-1>{{ title }}</span>
        </template>
        <template v-else>
          <span mr-1>{{ title![0] }}</span>
          <span inline-block>{{ title![1] }}</span>
          <span>{{ title![2] }}</span>
        </template>
      </RouterLink>
    </template>
  </div>
</template>

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-navbar-brand {
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;

  .sakura-logo-link {
    color: var(--sakura-navbar-text-color);
    font-size: 24px;
    font-weight: 600;

    @include screen('md') {
      font-size: 28px;
      font-weight: 800;
    }

    span:first-child {
      border-radius: 9px;
      padding-bottom: 2px;
      padding-top: 5px;
    }

    &:hover {
      span:first-child {
        background-color: var(--sakura-navbar-bg-hover-color);
        color: var(--sakura-navbar-text-hover-color);
      }

      span:nth-of-type(2) {
        animation: rotate 1s linear infinite;
      }

      span:not(:first-child) {
        color: var(--sakura-navbar-bg-hover-color);
      }
    }
  }
}
</style>

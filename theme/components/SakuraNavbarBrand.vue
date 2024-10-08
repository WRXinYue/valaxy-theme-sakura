<script setup lang="ts">
import { useSiteConfig } from 'valaxy'

defineProps<{
  favicon?: boolean
  navbarTitle?: string | string[]
  hamburger?: boolean
}>()

const siteConfig = useSiteConfig()
</script>

<template>
  <div class="sakura-navbar-brand">
    <template v-if="favicon">
      <img class="h-40px w-40px" alt="logo" :src="siteConfig.favicon">
    </template>
    <template v-if="navbarTitle">
      <RouterLink class="sakura-logo-link" to="/" :aria-label="siteConfig.title">
        <template v-if="typeof navbarTitle === 'string'">
          <span mr-1>{{ navbarTitle }}</span>
        </template>
        <template v-else>
          <span mr-1>{{ navbarTitle![0] }}</span>
          <span inline-block>{{ navbarTitle![1] }}</span>
          <span>{{ navbarTitle![2] }}</span>
        </template>
      </RouterLink>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-navbar-brand {
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;

  .sakura-logo-link {
    color: var(--sakura-c-navbar-text);
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
        background-color: var(--sakura-c-navbar-hover-bg-color);
        color: var(--sakura-c-navbar-hover-color);
      }

      span:nth-of-type(2) {
        animation: rotate 1s linear infinite;
      }

      span:not(:first-child) {
        color: var(--sakura-c-navbar-hover-bg-color);
      }
    }
  }
}
</style>

<script setup lang="ts">
import { useSiteConfig } from 'valaxy'

defineProps<{
  favicon?: boolean
  title?: string
  hamburger?: boolean
}>()

const siteConfig = useSiteConfig()
</script>

<template>
  <div class="sakura-navbar-brand">
    <template v-if="favicon">
      <img class="navbar-logo h-40px w-40px" alt="logo" :src="siteConfig.favicon">
    </template>
    <template v-if="title">
      <div class="navbar-title">
        <RouterLink class="logo-link" to="/" :aria-label="siteConfig.title">
          <span>{{ title }}</span>
        </RouterLink>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;

  .navbar-logo {
    border-radius: 8px;
  }

  .navbar-title {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .logo-link {
    color: var(--sakura-navbar-title-color);
    font-size: 18px;
    font-weight: 600;
    line-height: normal;
    transition: color 0.2s ease;

    @include screen('md') {
      font-size: 20px;
      font-weight: 700;
    }

    @include screen('lg') {
      font-size: 22px;
    }

    &:hover {
      color: var(--sakura-color-primary);
    }
  }
}
</style>

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
      <RouterLink class="logo-link moe-mashiro" to="/" :aria-label="siteConfig.title">
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

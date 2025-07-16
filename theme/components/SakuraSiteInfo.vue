<script lang="ts" setup>
import { useSiteConfig } from 'valaxy'
import { useRouter } from 'vue-router'

const siteConfig = useSiteConfig()
const router = useRouter()
</script>

<template>
  <div class="site-info flex flex-col items-center">
    <RouterLink v-if="siteConfig.author.avatar" class="site-author-avatar" to="/about">
      <img class="rounded-full" :src="siteConfig.author.avatar" alt="avatar">
      <span class="site-author-status" :title="siteConfig.author.status.message">{{ siteConfig.author.status.emoji }}</span>
    </RouterLink>
    <div
      v-if="siteConfig.author.name"
      class="site-author-name leading-6"
      m="t-0 b-4"
    >
      <RouterLink to="/about">
        {{ siteConfig.author.name }}
      </RouterLink>
    </div>
    <RouterLink v-if="router.hasRoute('/about/site')" to="/about/site" class="site-name">
      {{ siteConfig.title }}
    </RouterLink>
    <span v-else class="site-name">{{ siteConfig.title }}</span>
    <h4 v-if="siteConfig.subtitle" class="site-subtitle block" text="xs">
      {{ siteConfig.subtitle }}
    </h4>
    <div v-if="siteConfig.description" class="site-description my-1">
      {{ siteConfig.description }}
    </div>
  </div>
</template>

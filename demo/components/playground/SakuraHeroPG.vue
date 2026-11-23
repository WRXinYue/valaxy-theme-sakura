<script lang="ts" setup>
import type { ThemeUserConfig } from 'valaxy-theme-sakura'
import { ref } from 'vue'

const config = ref<ThemeUserConfig>({
  hero: {
    title: 'My Banner',
    urls: [
      'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-j8epp5.png',
      'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-wewdy7.jpg',
      'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-pkxlv3.jpg',
    ],
    style: 'dot',
    waveTheme: 'fish',
  },
  notice: {
    message: '欢迎来到我的博客！',
  },
})

function configUpdate(newConfig: any) {
  config.value = newConfig
}
</script>

<template>
  <FullScreenWrapper class="hero-preview">
    <SakuraHero :hero="config.hero">
      <template #notice>
        <SakuraNotice v-if="config.notice?.message" :message="config.notice.message" />
      </template>
    </SakuraHero>
  </FullScreenWrapper>

  <CodeEditor :config="config" @update:config="configUpdate" />
</template>

<style scoped>
.hero-preview:not(.is-fullscreen) {
  position: relative;
  container-type: inline-size;
  isolation: isolate;
}

.hero-preview:not(.is-fullscreen) :deep(.sakura-hero) {
  --sakura-hero-topbar-offset-x: clamp(1rem, 3cqi, 2.25rem);
  --sakura-hero-topbar-offset-y: 3rem;

  height: clamp(18rem, 56.25cqi, 36rem);
}

.hero-preview:not(.is-fullscreen) :deep(.sakura-hero-background) {
  height: 100%;
}

.hero-preview:not(.is-fullscreen) :deep(.sakura-hero-background-img) {
  /* The wallpaper component sets attachment inline when fixedImg is enabled. */
  background-attachment: scroll !important;
  background-repeat: no-repeat;
}

.hero-preview:not(.is-fullscreen) :deep(.sakura-hero-deco) {
  font-size: min(9cqi, var(--sakura-hero-title-size, 6rem));
}

.hero-preview:not(.is-fullscreen) :deep(.sakura-hero-capsule) {
  top: calc(var(--sakura-hero-topbar-offset-y) + 2.75rem);
  width: max-content;
  max-width: calc(100% - 2 * var(--sakura-hero-topbar-offset-x));
}

.hero-preview:not(.is-fullscreen) :deep(.sakura-notice.is-expanded) {
  max-width: min(40rem, 100%);
}

.hero-preview:not(.is-fullscreen) :deep(.sakura-hero-bottom-area) {
  position: relative;
}

.hero-preview:not(.is-fullscreen) :deep(.sakura-hero-bottom-area-spacer) {
  display: none;
}

.hero-preview:not(.is-fullscreen) :deep(.navbar-content) {
  display: flex;
  gap: 0.5rem;
}

.hero-preview:not(.is-fullscreen) :deep(.navbar-link) {
  flex: 1;
}

.hero-preview:not(.is-fullscreen) :deep(.sakura-navbar-link) {
  display: flex;
  max-width: 100%;
  overflow-x: auto;
}

.hero-preview:not(.is-fullscreen) :deep(.sakura-navbar-link-item),
.hero-preview:not(.is-fullscreen) :deep(.navbar-tool) {
  flex: none;
  white-space: nowrap;
}
</style>

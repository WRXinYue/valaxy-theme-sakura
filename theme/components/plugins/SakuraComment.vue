<script lang="ts" setup>
import { useRuntimeConfig } from 'valaxy'

const runtimeConfig = useRuntimeConfig()
</script>

<template>
  <SakuraCard w="full" class="comment sakura-comment" mt-6>
    <ClientOnly>
      <YunWaline v-if="runtimeConfig.addons['valaxy-addon-waline']" />
      <!-- <YunTwikoo v-if="runtimeConfig.addons['valaxy-addon-twikoo']" /> -->
      <slot />
    </ClientOnly>
  </SakuraCard>
</template>

<style lang="scss">
.comment {
  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h5 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h6 {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  ul {
    list-style: disc;
    margin-left: 1rem;
    margin-bottom: 1rem;
  }

  ol {
    list-style: decimal;
    margin-left: 1rem;
    margin-bottom: 1rem;
  }
}
</style>

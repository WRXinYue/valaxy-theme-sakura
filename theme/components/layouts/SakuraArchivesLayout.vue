<script lang="ts" setup>
import { useSiteStore } from 'valaxy'

const site = useSiteStore()
</script>

<template>
  <SakuraPage class="sakura-archivers-page">
    <RouterView v-slot="{ Component }">
      <component :is="Component">
        <template #main-content>
          <slot name="content">
            <SakuraTimeLine :posts="site.postList" />
          </slot>
        </template>
      </component>
    </RouterView>
  </SakuraPage>
</template>

<script lang="ts" setup>
import { useLayout } from 'valaxy'

const isHome = useLayout('home')
</script>

<template>
  <Layout>
    <SakuraMultiColumns>
      <template #left>
        <SakuraAside>
          <SidebarThemeDynamic />
        </SakuraAside>
      </template>
      <template #content>
        <RouterView />
      </template>
      <template #right>
        <SakuraAside>
          <SakuraToc v-if="!isHome" />
        </SakuraAside>
      </template>
    </SakuraMultiColumns>
  </Layout>
</template>

<script lang="ts" setup>
import { useLayout } from 'valaxy'

const isHome = useLayout('home')
</script>

<template>
  <Layout>
    <SakuraMultiColumnsLayout>
      <template #left>
        <SakuraAsideLayout>
          <SidebarThemeDynamic />
        </SakuraAsideLayout>
      </template>
      <template #content>
        <RouterView />
      </template>
      <template #right>
        <SakuraAsideLayout>
          <SakuraToc v-if="!isHome" />
        </SakuraAsideLayout>
      </template>
    </SakuraMultiColumnsLayout>
  </Layout>
</template>

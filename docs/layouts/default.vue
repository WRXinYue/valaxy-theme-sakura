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
        <div class="content">
          <RouterView v-slot="{ Component }">
            <component :is="Component">
              <template #main-content-after>
                <div class="prose">
                  <p /> <!-- Context spacing -->
                  <h2 id="Contributors">
                    <a href="#Contributors" class="header-anchor" />
                    Contributors
                  </h2>
                  <GitLogContributor />
                </div>
              </template>
            </component>
          </RouterView>
        </div>
      </template>
      <template #right>
        <SakuraAsideLayout>
          <SakuraToc v-if="!isHome" />
        </SakuraAsideLayout>
      </template>
    </SakuraMultiColumnsLayout>
  </Layout>
</template>

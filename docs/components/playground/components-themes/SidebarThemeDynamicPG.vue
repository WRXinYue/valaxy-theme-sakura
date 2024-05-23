<script lang="ts" setup>
import { useThemeConfig } from 'valaxy'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const themeConfig = useThemeConfig() as any
const router = useRouter()

const config = ref(
  {
    sidebar: themeConfig.value.sidebar,
  },
)

function configUpdate(newConfig: any) {
  config.value = newConfig
}

// Loading this module will cause global style changes, this is the simplest solution for now
router.afterEach(() => {
  location.reload()
})
</script>

<template>
  <SakuraSidebar>
    <SidebarThemeDynamic :sidebar="config.sidebar" />
  </SakuraSidebar>

  <CodeEditor :config="config" @update:config="configUpdate" />
</template>

<style lang="scss">
// Reset style
.prose ol > li::before {
  display: none;
}
.prose ul > li {
  position: inherit;
}

.prose li {
  margin: 0 !important;
}
</style>

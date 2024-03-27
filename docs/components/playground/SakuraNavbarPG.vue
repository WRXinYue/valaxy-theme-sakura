<script lang="ts" setup>
import { ref } from 'vue'

const config = ref(
  {
    navbarTitle: ['Hello', '', 'Sakura'],
    navbar: [
      {
        text: 'GitHub',
        icon: 'i-ri-github-fill',
        link: 'https://github.com/WRXinYue/valaxy-theme-sakura',
      },
      {
        text: 'RSS',
        icon: 'i-ri-rss-fill',
        link: '/atom.xml',
      },
      {
        text: 'Discord',
        icon: 'i-ri-discord-fill',
        link: 'https://discord.gg/sGe4U4p4CK',
      },
      {
        text: 'Valaxy →',
        icon: 'i-ri-cloud-fill',
        link: 'https://github.com/YunYouJun/valaxy',
        submenu: [
          {
            text: '云游君的小站',
            icon: 'i-ri-cloud-fill',
            link: 'https://www.yunyoujun.cn/',
          },
        ],
      },
    ],
  },
)

function configUpdate(newConfig: any) {
  config.value = newConfig
}
</script>

<template>
  <SakuraNavbar class="!relative border rounded-1" :title="config.navbarTitle" :invert-scrolled="true">
    <template #nav-link>
      <SakuraNavLink :navbar="config.navbar" />
    </template>
  </SakuraNavbar>

  <CodeEditor :config="config" @update:config="configUpdate" />
</template>

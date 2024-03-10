<script lang="ts" setup>
import { ref } from 'vue'
import type { NavItem } from 'valaxy-theme-sakura/types'

const navbar = ref<Array<NavItem>>(
  [
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
    },
  ],
)
const navbarTitle = ref(['Hello', '', 'Sakura'])

const currentNavbar = ref(navbar.value[0])

function handleSelect(index: string) {
  currentNavbar.value = navbar.value[Number(index)]
}
</script>

<template>
  <SakuraNavbar class="!relative border rounded-1" :navbar :title="navbarTitle" />

  <el-divider content-position="left">
    navbarTitle
  </el-divider>
  <el-form :inline="true">
    <el-form-item>
      <el-input v-model="navbarTitle[0]" />
    </el-form-item>
    <el-form-item>
      <el-input v-model="navbarTitle[1]" />
    </el-form-item>
    <el-form-item>
      <el-input v-model="navbarTitle[2]" />
    </el-form-item>
  </el-form>

  <el-divider content-position="left">
    navbar
  </el-divider>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item v-for="(item, i) in navbar" :key="item.text" :index="i.toString()">
      <i :class="item.icon" />
      {{ item.text }}
    </el-menu-item>
  </el-menu>
  <el-form label-position="top">
    <el-form-item label="Navbar Text">
      <el-input v-model="currentNavbar.text" />
    </el-form-item>

    <el-form-item label="Navbar Icon">
      <el-input v-model="currentNavbar.icon" />
    </el-form-item>

    <el-form-item label="Navbar Link">
      <el-input v-model="currentNavbar.link" />
    </el-form-item>
  </el-form>
</template>

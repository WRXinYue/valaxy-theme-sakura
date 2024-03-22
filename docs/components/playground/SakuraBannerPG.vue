<script lang="ts" setup>
import { ref } from 'vue'
import type { Banner } from 'valaxy-theme-sakura/types'

const banner = ref<Banner>({
  enable: true,
  title: 'My Banner',
  motto: 'This is my motto',
  urls: [
    'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-j8epp5.png',
    'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-wewdy7.jpg',
  ],
  style: 'filter-dot',
})
</script>

<template>
  <SakuraBanner :banner />

  <el-form label-position="top">
    <!-- <el-form-item label="Enable Banner">
      <el-switch v-model="banner.enable" />
    </el-form-item> -->

    <el-form-item label="Banner Title">
      <el-input v-model="banner.title" />
    </el-form-item>

    <el-form-item label="Banner Motto">
      <el-input v-model="banner.motto" />
    </el-form-item>

    <el-form-item label="Banner Urls">
      <el-input v-model="banner.urls[0]" />
    </el-form-item>

    <el-form-item label="Banner Style">
      <el-select v-model="banner.style" placeholder="Banner Style">
        <el-option label="filter-dot" value="filter-dot" />
        <el-option label="filter-dim" value="filter-dim" />
        <el-option label="filter-grid" value="filter-grid" />
        <el-option label="" value="" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

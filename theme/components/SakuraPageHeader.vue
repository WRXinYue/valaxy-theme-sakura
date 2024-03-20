<script lang="ts" setup>
import { useScriptTag } from '@vueuse/core'
import { useSiteConfig } from 'valaxy'
import { useThemeConfig } from '../composables'

defineProps<{
  color?: string
  icon?: string
  title: string
  subTitle?: string
  cover?: string
  author?: string
  date?: string | number | Date
}>()

useScriptTag('//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js')

const themeConfig = useThemeConfig()
const siteConfig = useSiteConfig()
</script>

<template>
  <header class="xl:pb-10 space-y-1 text-center" :class="themeConfig.animation && 'element-slide-down'">
    <div class="abanner" :class="cover ? `h-80` : '<xl:max-h-200px h-45'" :style="cover && `background-image: url(${cover}`">
      <div class="titlebox font-bold" :class="cover && 'text-shadow-[2px_2px_10px_black]'">
        <h1 class="text-3xl" :class="!cover && 'text-[#404040] entry-title'">
          <div v-if="icon" class="icon" m="r-1" inline-flex align-top :class="icon" />
          {{ title }}
          <span v-if="subTitle">· {{ subTitle }}</span>
        </h1>
        <div v-if="date" class="info text-base inline-flex" :class="!cover && 'text-[#888888]'">
          {{ siteConfig.author.name }} · 更新于 <SakuraDate :date="date" />
          <span id="busuanzi_container_page_pv">
            <span id="busuanzi_value_page_pv" />次阅读
          </span>
          <!-- {{ author }} · 更新于 <SakuraDate :date="date" /> · {{ view }} 次阅读 -->
        </div>
      </div>
    </div>

    <hr class="max-w-[50%] min-w-[40%] m-auto">
  </header>
</template>

<style lang="scss" scoped>
.entry-title {
  &::before {
    content:" {";
    color:#f8ba0b;
    font-size:1.2em;
    margin-right:6px;
    font-family: 'Helvetica'
  }
  &::after {
    content:"}";
    color:#f8ba0b;
    font-size:1.2em;
    margin-left:6px;
    font-family: 'Helvetica'
  }
}
.abanner {
  width: 100%;
  background-size: cover;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;

  .titlebox {
    position: absolute;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    bottom: 20px;
    color: white;
  }

}
</style>

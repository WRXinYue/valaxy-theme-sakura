<script lang="ts" setup>
defineProps<{
  color?: string
  icon?: string
  title: string
  subTitle?: string
  cover?: string
  author?: string
  date?: string
}>()
</script>

<template>
  <header class="xl:pb-10 space-y-1 text-center">
    <div class="abanner" :class="cover ? `h-80` : '<xl:max-h-200px h-45'" :style="`background-image: url(${cover}`">
      <div class="titlebox font-bold" :class="cover && 'text-shadow-[2px_2px_10px_black]'">
        <h1 class="text-3xl" :class="!cover && 'text-[#404040] entry-title'">
          <div v-if="icon" class="icon" m="r-1" inline-flex align-top :class="icon" />
          {{ title }}
          <span v-if="subTitle">· {{ subTitle }}</span>
        </h1>
        <div v-if="date" class="info text-base inline-flex" :class="!cover && 'text-[#888888]'">
          {{ author }} · 更新于 <SakuraDate :date="date" />
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
  background-position: center -7cm;
  position: relative;

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

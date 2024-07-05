<script lang="ts" setup>
const props = defineProps<{
  color?: string
  icon?: string
  title: string
  subTitle?: string
  cover?: string
  author?: string
  date?: string | number | Date
}>()
</script>

<template>
  <header class="sakura-page-header xl:pb-10 space-y-1 text-center">
    <div class="page-banner" :class="cover ? `h-80` : '<xl:max-h-200px mt-$st-c-navbar-height'" :style="cover && `background-image: url(${cover}`">
      <div class="title-container" :class="cover && 'text-shadow-[2px_2px_10px_black]'">
        <h1 class="text-3xl" :class="!cover && 'text-$st-c-text-deep entry-title'">
          <div v-if="icon" class="icon" m="r-1" inline-flex align-top :class="icon" />
          {{ title }}
          <span v-if="subTitle">· {{ subTitle }}</span>
        </h1>
        <SakuraArticleMeta v-bind="props" />
      </div>
    </div>

    <hr class="max-w-[50%] min-w-[40%] m-auto">
  </header>
</template>

<style lang="scss">
.sakura-page-header {
  .page-banner {
    display: flex;
    align-items: flex-end;
    width: 100%;
    background-size: cover;
    position: relative;
    background-repeat: no-repeat;
    background-position: center;

    .title-container {
      max-width: 800px;
      margin: 0 auto;
      margin-bottom: 20px;
      color: white;
      font-weight: 700;
    }
  }

  .info {
    font-size: 1rem;
    line-height: 1.5rem;
    display: inline-flex;
  }
}
</style>

<script lang="ts" setup>
import type { PostFrontMatter } from 'valaxy'
import { useSiteConfig } from 'valaxy'
import { useAddonVercount } from 'valaxy-addon-vercount'
import { useI18n } from 'vue-i18n'

defineProps<{
  fm: PostFrontMatter
}>()

const { page } = useAddonVercount()

const { t } = useI18n()

const siteConfig = useSiteConfig()
</script>

<template>
  <div class="sakura-post-header-meta" flex="~ wrap gap-x-4" py="1" :class="{ 'text-$sakura-color-text': !fm.cover }">
    <!-- TODO: 支持多作者 -->
    <!-- <span class="inline-flex-center">
        <SakuraImageCard to="/about" class="mr-3px h-30px w-30px rounded-full" :src="siteConfig.author.avatar" alt="author image" />
        <span m="l-1">
          {{ siteConfig.author.name }}
        </span>
      </span> -->

    <!-- TODO: 分类,标签 -->

    <!-- <div class="inline-block" i-ri-calendar-line />
      <div i-ri-calendar-2-line /> -->
    <SakuraPostDate :date="fm.date" type="posted" class="posted-time post-time" />
    <SakuraPostDate v-if="fm.updated && fm.updated !== fm.date" :date="fm.updated" type="edited" class="post-time edited-time" />

    <template v-if="siteConfig.statistics.enable">
      <span
        v-if="fm.wordCount"
        class="inline-flex-center word-count whitespace-nowrap" :title="t('statistics.word')"
      >
        <div class="inline-block" i-ri-file-word-line />
        <span m="l-1">{{ t('statistics.word') }}: {{ fm.wordCount }}</span>
      </span>

      <span
        v-if="fm.readingTime"
        class="inline-flex-center reading-time whitespace-nowrap"
        :title="t('statistics.time')"
      >
        <div i-ri-timer-line />
        <time m="l-1">{{ t('statistics.time') }}: {{ fm.readingTime }}m</time>
      </span>
    </template>

    <span class="inline-flex-center">
      <div i-ri-eye-line />
      <span m="l-1">{{ t('statistics.pv') }}: {{ page.pv }}</span>
    </span>
  </div>
</template>

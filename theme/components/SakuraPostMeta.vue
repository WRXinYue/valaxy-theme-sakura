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
  <div class="sakura-post-meta" flex="~ <md:col" justify="center" items="center" py="1" :class="{ 'text-$sakura-text-muted-color': !fm.cover }">
    <div class="post-time flex items-center">
      <span class="inline-flex-center">
        <SakuraImageCard to="/about" class="mr-3px h-30px w-30px rounded-full" :src="siteConfig.author.avatar" alt="author image" />
        <span m="l-1">
          {{ siteConfig.author.name }}
        </span>
      </span>

      <!-- TODO: 分类,标签 -->

      <span mr-4 />

      <span class="inline-flex-center">
        <div i-ri-eye-line />
        <span m="l-1">{{ page.pv }}</span>
      </span>

      <span mr-4 />
    </div>

    <div v-if="fm" class="post-time flex items-center">
      <span class="inline-flex-center posted-time" :title="t('post.posted') + fm.date">
        <div class="inline-block" i-ri-calendar-line />
        <SakuraDate m="l-1" itemprop="datePublished" :date="fm.date" />
      </span>
      <span
        v-if="fm.updated && fm.updated !== fm.date"
        class="inline-flex-center edited-time" :title="t('post.edited') + fm.updated"
      >
        <span m="x-2">-</span>
        <div i-ri-calendar-2-line />
        <SakuraDate m="l-1" itemprop="dateModified" :date="fm.updated" />
      </span>

      <span mr-4 />
    </div>

    <div v-if="siteConfig.statistics.enable" class="post-time flex items-center">
      <span
        v-if="fm.wordCount"
        class="inline-flex-center word-count" :title="t('statistics.word')"
      >
        <div class="inline-block" i-ri-file-word-line />
        <span m="l-1">{{ fm.wordCount }}</span>
      </span>

      <span
        v-if="fm.readingTime"
        class="inline-flex-center reading-time"
        :title="t('statistics.time')"
      >
        <span m="x-2">-</span>
        <div i-ri-timer-line />
        <time m="l-1">{{ fm.readingTime }}m</time>
      </span>
    </div>
  </div>
</template>

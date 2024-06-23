<script lang="ts" setup>
import { useFrontmatter, useSiteConfig } from 'valaxy'
import { useI18n } from 'vue-i18n'

defineProps<{
  color?: string
  icon?: string
  title: string
  subTitle?: string
  cover?: string
  author?: string
  date?: string | number | Date
}>()

const { t } = useI18n()

const siteConfig = useSiteConfig()
const frontmatter = useFrontmatter()
</script>

<template>
  <div flex="~ <md:col" justify="center" items="center" py="1" :class="{ 'text-$st-c-text-secondary': !cover }">
    <div class="post-time flex items-center">
      <SakuraImageCard to="/about" class="rounded-full h-30px w-30px mr-3px" :src="siteConfig.author.avatar" alt="author image" />

      <span class="inline-flex-center">
        {{ siteConfig.author.name }}
      </span>

      <!-- TODO: 分类,标签 -->

      <span mr-4 />

      <span class="inline-flex-center">
        <div i-ri-eye-line />
        <SakuraBusuanzi />
      </span>

      <span mr-4 />
    </div>

    <div v-if="frontmatter" class="post-time flex items-center">
      <span class="posted-time inline-flex-center" :title="t('post.posted') + frontmatter.date">
        <div class="inline-block" i-ri-calendar-line />
        <SakuraDate m="l-1" :date="frontmatter.date" />
      </span>
      <span
        v-if="frontmatter.updated && frontmatter.updated !== frontmatter.date"
        class="edited-time inline-flex-center" :title="t('post.edited') + frontmatter.updated"
      >
        <span m="x-2">-</span>
        <div i-ri-calendar-2-line />
        <SakuraDate m="l-1" :date="frontmatter.updated" />
      </span>

      <span mr-4 />
    </div>

    <div v-if="siteConfig.statistics.enable" class="post-time flex items-center">
      <span
        v-if="frontmatter.wordCount"
        class="word-count inline-flex-center" :title="t('statistics.word')"
      >
        <div class="inline-block" i-ri-file-word-line />
        <span m="l-1">{{ frontmatter.wordCount }}</span>
      </span>

      <span
        v-if="frontmatter.readingTime"
        class="reading-time inline-flex-center"
        :title="t('statistics.time')"
      >
        <span m="x-2">-</span>
        <div i-ri-timer-line />
        <time m="l-1">{{ frontmatter.readingTime }}m</time>
      </span>
    </div>
  </div>
</template>

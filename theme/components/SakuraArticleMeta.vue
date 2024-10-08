<script lang="ts" setup>
import { useFrontmatter, useSiteConfig } from 'valaxy'
import { useI18n } from 'vue-i18n'
import { useAddonVercount } from 'valaxy-addon-vercount'

defineProps<{
  color?: string
  icon?: string
  title: string
  subTitle?: string
  cover?: string
  author?: string
  date?: string | number | Date
}>()

const { page } = useAddonVercount()

const { t } = useI18n()

const siteConfig = useSiteConfig()
const frontmatter = useFrontmatter()
</script>

<template>
  <div flex="~ <md:col" justify="center" items="center" py="1" :class="{ 'text-$sakura-c-text-secondary': !cover }">
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

    <div v-if="frontmatter" class="post-time flex items-center">
      <span class="inline-flex-center posted-time" :title="t('post.posted') + frontmatter.date">
        <div class="inline-block" i-ri-calendar-line />
        <SakuraDate m="l-1" itemprop="datePublished" :date="frontmatter.date" />
      </span>
      <span
        v-if="frontmatter.updated && frontmatter.updated !== frontmatter.date"
        class="inline-flex-center edited-time" :title="t('post.edited') + frontmatter.updated"
      >
        <span m="x-2">-</span>
        <div i-ri-calendar-2-line />
        <SakuraDate m="l-1" itemprop="dateModified" :date="frontmatter.updated" />
      </span>

      <span mr-4 />
    </div>

    <div v-if="siteConfig.statistics.enable" class="post-time flex items-center">
      <span
        v-if="frontmatter.wordCount"
        class="inline-flex-center word-count" :title="t('statistics.word')"
      >
        <div class="inline-block" i-ri-file-word-line />
        <span m="l-1">{{ frontmatter.wordCount }}</span>
      </span>

      <span
        v-if="frontmatter.readingTime"
        class="inline-flex-center reading-time"
        :title="t('statistics.time')"
      >
        <span m="x-2">-</span>
        <div i-ri-timer-line />
        <time m="l-1">{{ frontmatter.readingTime }}m</time>
      </span>
    </div>
  </div>
</template>

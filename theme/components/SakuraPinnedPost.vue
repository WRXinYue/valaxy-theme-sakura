<script lang="ts" setup>
import { computed } from 'vue'
import { useNavigate, useThemeConfig } from '../composables'
import type { PostPinned } from '../types'

const props = defineProps<Partial<PostPinned>>()

const themeConfig = useThemeConfig()
const navigate = useNavigate()

const icon = computed(() => props.icon ?? themeConfig.value.articlePinned?.icon)
const text = computed(() => props.text ?? themeConfig.value.articlePinned?.text)
const entries = computed(() => props.entries ?? themeConfig.value.articlePinned?.entries)
</script>

<template>
  <div v-if="entries?.length" class="sakura-pinned-post <md:hidden">
    <SakuraDivider :icon :text />
    <div class="sakura-pinned-post-card flex">
      <SakuraImageCard
        v-for="(entry, i) in entries" :key="i" :data-title="entry.title" :to="entry.link"
        :data-desc="entry.desc" :overlay="true" :src="entry.img"
        :class="entry.link ? 'cursor-pointer' : ''" @click="navigate.to(entry.link || '')"
      />
    </div>
  </div>
</template>

<style lang="scss">
.sakura-pinned-post {
  &-card {
    justify-content: space-between;
    height: 160px;
  }

  .sakura-image-card {
    position: relative;
    flex: 1;
    margin: 0 3px;
    border-radius: var(--sakura-post-card-rd);
    overflow: hidden;

    &::before,
    &::after {
      position: absolute;
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      transition:
        right 0.35s ease,
        left 0.5s ease;
      z-index: 1;
    }

    &::before {
      content: attr(data-title);
      top: 30px;
      right: 100%;
      background-color: rgba(0, 0, 0, 0.8);
    }

    &::after {
      content: attr(data-desc);
      top: 70px;
      left: 100%;
      font-size: 12px;
    }

    &:hover {
      &::before {
        right: 0;
      }

      &::after {
        left: 0;
      }
    }
  }
}
</style>

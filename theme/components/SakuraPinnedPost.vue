<script lang="ts" setup>
import { computed } from 'vue'
import type { PinnedPost } from '../types'
import { useNavigate, useThemeConfig } from '../composables'

const props = defineProps<Partial<PinnedPost & { icon: string }>>()

const themeConfig = useThemeConfig()
const navigate = useNavigate()

const icon = computed(() => props.icon ?? themeConfig.value.ui.pinnedPost?.icon)
const text = computed(() => props.text ?? themeConfig.value.pinnedPost?.text)
const entries = computed(() => props.entries ?? themeConfig.value.pinnedPost?.entries)
</script>

<template>
  <div v-if="entries?.length" class="sakura-pinned-post <md:hidden">
    <SakuraDivider :icon :text />
    <div class="sakura-card sakura-pinned-post-card flex">
      <SakuraImageCard
        v-for="(entry, i) in entries" :key="i" :data-title="entry.title" :to="entry.link"
        :data-desc="entry.desc" :overlay="true" :src="entry.img"
        :class="entry.link ? 'cursor-pointer' : ''" @click="navigate.to(entry.link || '')"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
      color: oklch(100% 0 0);
      transition:
        right 0.35s ease,
        left 0.5s ease;
      z-index: 1;
    }

    &::before {
      content: attr(data-title);
      top: 30px;
      right: 100%;
      background-color: var(--sakura-color-overlay-background);
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

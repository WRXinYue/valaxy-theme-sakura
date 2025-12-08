<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { computed } from 'vue'
import { useThemeConfig } from '../composables'

const props = defineProps<{
  icon?: string
  message?: string
}>()

const themeConfig = useThemeConfig()

const noticeMessage = computed(() => props.message || themeConfig.value.notice?.message)
const icon = computed(() => props.icon || themeConfig.value.ui.notice?.icon)

const closedNoticeContent = useStorage('sakura-notice-closed-content', '')

const isVisible = computed(() => {
  if (!noticeMessage.value)
    return false
  return closedNoticeContent.value !== noticeMessage.value
})

function closeNotice() {
  if (noticeMessage.value)
    closedNoticeContent.value = noticeMessage.value
}
</script>

<template>
  <div v-if="isVisible" m="b-5 t-10" class="sakura-notice-board sakura-card">
    <div class="sakura-notice-content">
      <div class="sakura-notice-icon-wrapper">
        <span :class="icon" class="notice-icon sakura-icon" />
      </div>
      <span class="notice-message" v-html="noticeMessage" />
    </div>
    <button class="sakura-notice-close-btn" aria-label="Close notice" @click="closeNotice">
      <div i-ri-close-line />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-notice-board {
  position: relative;
  width: 100%;
  background: var(--sakura-card-bg);
  color: var(--sakura-color-text);
  border: 1px solid transparent;
  transition: all 0.3s;

  .sakura-notice-content {
    display: flex;
    align-items: center;
    padding: 20px;
    gap: 15px;
    padding-right: 40px;

    @include mobile {
      flex-direction: column;
      text-align: center;
      padding-right: 20px;
    }
  }

  .sakura-notice-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .notice-icon {
    font-size: 1.25rem;
  }

  .notice-message {
    line-height: 1.6;
  }

  .sakura-notice-close-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 4px;
    border-radius: 50%;
    color: var(--sakura-color-text);
    opacity: 0.6;
    transition: all 0.3s;
    cursor: pointer;
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: 1;
      color: var(--sakura-color-primary);
    }
  }

  @at-root html.dark & {
    border-color: var(--sakura-color-divider);
  }

  &:hover {
    border-color: var(--sakura-color-primary);

    .notice-icon {
      color: var(--sakura-color-primary);
      animation: notice-icon-move 2.5s infinite;
    }
  }
}

@keyframes notice-icon-move {
  0% {
    transform: rotate(0deg);
  }

  10% {
    transform: rotate(15deg);
  }

  20% {
    transform: rotate(-10deg);
  }

  30% {
    transform: rotate(5deg);
  }

  40% {
    transform: rotate(-5deg);
  }

  50% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
</style>

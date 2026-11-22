<script lang="ts" setup>
import { computed } from 'vue'
import { useThemeConfig } from '../composables'
import { isVideoUrl, isYouTubeUrl } from '../core/utils'
import { useSakuraAppStore } from '../stores'

const props = withDefaults(defineProps<{
  active?: boolean
}>(), {
  active: true,
})
const sakura = useSakuraAppStore()
const themeConfig = useThemeConfig()

const currentUrl = computed(() => {
  const urls = themeConfig.value.hero?.urls
  if (!urls)
    return ''
  if (typeof urls === 'string')
    return urls
  return urls[sakura.wallpaperDisplayIndex] || ''
})

const canSound = computed(() => isVideoUrl(currentUrl.value) || isYouTubeUrl(currentUrl.value))
const enabled = computed(() => sakura.wallpaperSoundEnabled)
</script>

<template>
  <button
    class="sakura-navbar-sound"
    :class="{ 'is-enabled': enabled, 'is-hidden': !props.active }"
    type="button"
    :disabled="!canSound"
    :aria-pressed="enabled"
    :aria-label="enabled ? '关闭声音' : '开启声音'"
    @click="sakura.toggleSound()"
  >
    <span class="sound-divider" aria-hidden="true" />
    <span class="sound-label">SOUND</span>
    <svg
      class="sound-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" fill="currentColor" stroke="none" />
      <template v-if="enabled">
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
        <path d="M18.5 5.5a9 9 0 0 1 0 13" />
      </template>
      <template v-else>
        <path d="m16 9 5 6" />
        <path d="m21 9-5 6" />
      </template>
    </svg>
  </button>
</template>

<style lang="scss" scoped>
.sakura-navbar-sound {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  height: 100%;
  max-width: 120px;
  padding: 0;
  overflow: hidden;
  font: inherit;
  color: var(--sakura-navbar-item-color);
  cursor: pointer;
  background: none;
  border: 0;
  transition:
    color 0.25s ease,
    max-width 0.45s cubic-bezier(0.19, 1, 0.22, 1),
    opacity 0.3s ease,
    transform 0.45s cubic-bezier(0.19, 1, 0.22, 1);

  &:disabled {
    cursor: default;
    opacity: 0.4;
  }

  &.is-hidden {
    max-width: 0;
    opacity: 0;
    transform: translateX(8px);
    pointer-events: none;
  }

  &:hover:not(:disabled),
  &.is-enabled {
    color: var(--sakura-color-primary);
  }
}

.sound-divider {
  width: 1px;
  height: 18px;
  margin-right: 3px;
  background: var(--sakura-color-divider);
}

.sound-label {
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.14em;
}

.sound-icon {
  width: 18px;
  height: 18px;
  flex: none;
}

@media (width < 768px) {
  .sound-divider,
  .sound-label {
    display: none;
  }
}
</style>

<script setup lang="ts">
import { useOutline } from 'valaxy'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useActiveAnchor } from '../client'
import { useThemeConfig } from '../composables'

const { viewScroll, collapsible } = defineProps<{
  viewScroll: boolean
  collapsible?: boolean
}>()

const themeConfig = useThemeConfig()
const { t } = useI18n()

const container = ref()
const marker = ref()

if (!collapsible)
  useActiveAnchor(container, marker, !viewScroll)

const { headers, handleClick } = useOutline()
</script>

<template>
  <component :is="collapsible ? 'details' : 'div'" v-show="headers.length" ref="container">
    <summary v-if="collapsible">
      {{ t('sidebar.toc') }}
    </summary>
    <div class="content">
      <div v-if="!collapsible" class="outline-title">
        {{ themeConfig.outlineTitle || 'On this page' }}
      </div>

      <div v-if="!collapsible" ref="marker" class="outline-marker" />

      <nav :aria-label="t('sidebar.toc')">
        <SakuraOutlineItem
          class="va-toc css-i18n-toc relative z-1"
          :headers="headers"
          :on-click="handleClick"
          root
        />
      </nav>
    </div>
  </component>
</template>

<style lang="scss" scoped>
.va-toc {
  text-align: left;
}

.content {
  position: relative;
  padding-left: 16px;
  font-size: 14px;
  text-align: left;
}

.outline-marker {
  position: absolute;
  top: 32px;
  left: -2px;
  z-index: 0;
  opacity: 0;
  width: 4px;
  height: 18px;
  background-color: var(--sakura-color-primary);
  transition:
    top 0.25s cubic-bezier(0, 1, 0.5, 1),
    background-color 0.5s,
    opacity 0.25s;
}

.outline-title {
  letter-spacing: 0.4px;
  line-height: 28px;
  font-size: 14px;
  font-weight: 600;
}

.outline-link {
  display: block;
  line-height: 28px;
  color: var(--va-c-text-light);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.5s;
}

.outline-link:hover,
.outline-link.active {
  color: var(--sakura-color-primary);
  transition: color 0.25s;
}

summary {
  cursor: pointer;
  font-weight: 600;
}
</style>

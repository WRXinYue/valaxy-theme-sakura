<script lang="ts" setup>
import { useLocale } from 'valaxy'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeConfig } from '../composables'

const props = defineProps<{
  toggleLocaleIcon?: string
}>()

const { t, locale } = useI18n()
const { toggleLocales } = useLocale()
const themeConfig = useThemeConfig()

const toggleLocaleIcon = computed(() => props.toggleLocaleIcon || themeConfig.value.ui.toggleLocaleButton?.icon)
</script>

<template>
  <button class="sakura-icon-btn sakura-toggle-locale" :title="t('button.toggle_langs')" @click="toggleLocales">
    <div class="transform transition" :class="[toggleLocaleIcon, locale === 'en' ? 'rotate-y-180' : '']" />
  </button>
</template>

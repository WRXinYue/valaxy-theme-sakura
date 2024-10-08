<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from 'valaxy'
import { useThemeConfig } from '../../composables'

const props = defineProps<{
  translateIcon?: string
}>()

const { t, locale } = useI18n()
const { toggleLocales } = useLocale()
const themeConfig = useThemeConfig()

const translateIcon = computed(() => props.translateIcon || themeConfig.value.translateIcon)
</script>

<template>
  <button class="sakura-icon-btn sakura-toggle-locale" :title="t('button.toggle_langs')" @click="toggleLocales">
    <div class="transform transition" :class="[translateIcon, locale === 'en' ? 'rotate-y-180' : '']" />
  </button>
</template>

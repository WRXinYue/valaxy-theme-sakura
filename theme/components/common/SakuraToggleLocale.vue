<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useLocale } from 'valaxy'

withDefaults(defineProps<{
  translateIcon?: string
}>(), {
  translateIcon: 'i-ri-translate',
})

const { t, locale } = useI18n()
const { toggleLocales } = useLocale()
</script>

<template>
  <button class="sakura-icon-btn sakura-toggle-locale" :title="t('button.toggle_langs')" @click="toggleLocales">
    <div class="transform transition" :class="[translateIcon, locale === 'en' ? 'rotate-y-180' : '']" />
  </button>
</template>

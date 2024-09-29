<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useLocale } from 'valaxy'

const { t, locale } = useI18n()
const { toggleLocales } = useLocale()
</script>

<template>
  <button class="sakura-icon-btn sakura-toggle-locale" :title="t('button.toggle_langs')" @click="toggleLocales">
    <div i-ri-translate class="transform transition" :class="locale === 'en' ? 'rotate-y-180' : ''" />
  </button>
</template>

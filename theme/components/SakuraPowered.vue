<script lang="ts" setup>
import { capitalize, computed } from 'vue'
import type { Pkg } from 'valaxy'
import { useValaxyConfig } from 'valaxy'
import { useI18n } from 'vue-i18n'
import valaxyPkg from 'valaxy/package.json'
import sakuraPkg from '../package.json'

const props = defineProps<{
  pkg?: Pkg
}>()

const { t } = useI18n()
const config = useValaxyConfig()

const pkg = computed (() => props.pkg || config.value.themeConfig.pkg || sakuraPkg)

const poweredHtml = computed(() => t('footer.powered', [`<a href="${valaxyPkg.repository.url}" target="_blank" rel="noopener">Valaxy</a> v${valaxyPkg.version}`]))
</script>

<template>
  <div class="powered" m="2">
    <span v-html="poweredHtml" /> | <span>{{ t('footer.theme') }} - <a :href="pkg.homepage" :title="`valaxy-theme-${config.theme}`" target="_blank">{{ capitalize(config.theme) }}</a> v{{ pkg.version }}</span>
  </div>
</template>

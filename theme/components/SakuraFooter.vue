<script lang="ts" setup>
import { capitalize, computed, onMounted, ref } from 'vue'
import { useSiteConfig, useValaxyConfig } from 'valaxy'
import { useI18n } from 'vue-i18n'
import valaxyPkg from 'valaxy/package.json'
import sakuraPkg from '../package.json'
import { useThemeConfig } from '../composables'
import type { Footer } from '../types'

const props = defineProps<{
  footer?: Footer
}>()

const { t } = useI18n()
const loading = ref(true)

const config = useValaxyConfig()
const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()

const footer = computed (() => props.footer || themeConfig.value.footer)

const year = new Date().getFullYear()

const isThisYear = computed(() => {
  return year === footer.value.since
})

const poweredHtml = computed(() => t('footer.powered', [`<a href="${valaxyPkg.repository.url}" target="_blank" rel="noopener">Valaxy</a> v${valaxyPkg.version}`]))
const footerIcon = computed(() => footer.value.icon!)

onMounted(() => {
  loading.value = false
})
</script>

<template>
  <footer v-if="!loading" class="sakura-footer h-$st-c-footer-height" text="center sm" style="color:var(--va-c-text-light)">
    <div v-if="footer.icp" class="icp" p="y-2" v-html="footer.icp" />

    <div class="copyright flex items-center justify-center" p="1">
      <span>
        Copyright &copy;
        <span itemprop="copyrightYear">
          <template v-if="!isThisYear">
            {{ footer.since }} -
          </template>
          {{ year }}
        </span>
      </span>

      <a v-if="footer.icon?.enable" m="x-2" class="inline-flex animate-pulse" :href="footerIcon.url" target="_blank" :title="footerIcon.title">
        <div :class="footerIcon.name" />
      </a>
      <img v-if="!footer.icon?.enable && footerIcon.img" class="lazy h-6 w-6 inline-flex animate-pulse" :src="footerIcon.img" title="Footer Icon Description">

      <span itemprop="copyrightHolder">{{ siteConfig.author.name }}</span>
    </div>

    <div v-if="footer.powered" class="powered" m="2">
      <span v-html="poweredHtml" /> | <span>{{ t('footer.theme') }} - <a :href="sakuraPkg.homepage" :title="`valaxy-theme-${config.theme}`" target="_blank">{{ capitalize(config.theme) }}</a> v{{ sakuraPkg.version }}</span>
    </div>

    <slot />
  </footer>
</template>

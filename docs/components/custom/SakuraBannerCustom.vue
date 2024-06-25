<script lang="ts" setup>
import { useFrontmatter } from 'valaxy'
import { useI18n } from 'vue-i18n'

const frontmatter = useFrontmatter()

const { t } = useI18n()
</script>

<template>
  <SakuraBanner class="h-[calc(100vh-var(--st-c-footer-height)-var(--st-c-navbar-height))]!">
    <template #info-overlay>
      <InfoOverlayThemeHero>
        <template #intro-text>
          <div />
        </template>

        <template #highlighted-text>
          <span text="4xl md:7xl">
            {{ frontmatter.hero.name }}
          </span>
        </template>

        <template #subheading-text>
          <SakuraTypewriter text="2xl md:5xl" leading="2.5rem md:5.5rem" class="ws-pre-wrap" :type-string="t('banner.introduction')" />
        </template>

        <template #muted-text>
          {{ t('theme.description') }}
        </template>

        <template #utils>
          <div class="animation-fade-up flex flex-wrap" style="animation-delay: 1400ms;">
            <PressButton
              v-for="action in frontmatter.hero.actions"
              :key="action.link"
              :class="action.class"
              :icon="action.icon"
              :theme="action.theme"
              :link="action.link"
              :text="action.text"
              mr="6px"
            />
            <ReleaseButton />
          </div>
        </template>
      </InfoOverlayThemeHero>
    </template>
  </SakuraBanner>
</template>

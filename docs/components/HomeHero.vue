<script lang="ts" setup>
import { useFrontmatter } from 'valaxy'
import { useI18n } from 'vue-i18n'
import pkg from 'valaxy-theme-sakura/package.json'

const fm = useFrontmatter()

const { t } = useI18n()
</script>

<template>
  <div flex="~ col" justify="center">
    <span text="4xl md:6xl" font="black" class="gradient-text" bg="gradient-to-r">
      {{ fm.hero.name }}
    </span>

    <span m="t-4" text="3xl md:5xl" font="black" leading="2.5rem md:6.5rem" ws-pre-wrap>
      {{ t('banner.introduction') }}
    </span>

    <span>{{ t('theme.description') }}</span>

    <div p="t-6">
      <AppLink
        border="3 $st-c-secondary" to="releases" style="text-decoration: none;"
        class="btn hvr-bounce-to-right overflow-hidden transition rounded-full w-auto pl-1" bg="gradient-to-r transparent"
        hover="shadow-md bg-transparent border-$st-hover-border"
      >
        <div flex items-center>
          <div class="rounded-full aspect-ratio-square w-9 h-9 mr-1 flex items-center justify-center color-white" bg="$st-c-secondary">
            <div i-simple-icons-npm />
          </div>
          <div dark="color-white" class="color-black min-w-30">
            v{{ pkg.version }} is out now!
          </div>
        </div>
      </AppLink>
    </div>

    <div p="t-6">
      <PressButton
        v-for="action in fm.hero.actions"
        :key="action.link"
        :theme="action.theme"
        :link="action.link"
        :text="action.text"
        m="r-3"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gradient-text {
  background: linear-gradient(to right, var(--st-c-brand), 60%, var(--st-c-secondary));
  background-clip: text;
  color: transparent;
}
</style>

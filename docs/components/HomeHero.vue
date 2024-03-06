<script lang="ts" setup>
import { useFrontmatter } from 'valaxy'
import { useI18n } from 'vue-i18n'
import pkg from 'valaxy-theme-sakura/package.json'

const fm = useFrontmatter()

const { t } = useI18n()
</script>

<template>
  <div m="t-10 md:t-0" flex="~ col" justify="center">
    <h1 py="10" text="!5xl" font="black" class="gradient-text" bg="gradient-to-r">
      {{ fm.hero.name }}
    </h1>

    <h2 max-w-130 text="4xl md:6xl" font="black" leading="2.5rem md:6.5rem">
      {{ t('banner.introduction') }}
    </h2>

    <div m="t-8">
      <h3>{{ t('theme.description') }}</h3>
    </div>

    <div p="t-6">
      <AppLink
        border="3 $st-c-brand"
        to="releases"
        class="btn transition rounded-full hover:shadow-md w-auto pl-1"
        bg="gradient-to-r transparent"
      >
        <div flex items-center>
          <div class="rounded-full aspect-ratio-square w-9 h-9 mr-1 flex items-center justify-center" bg="$st-c-brand">
            <div i-simple-icons-npm />
          </div>
          <div dark="color-white" class="color-black">
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

<script setup lang="ts">
import { useSiteConfig } from 'valaxy'

defineProps<{
  favicon?: boolean
  title?: string | string[]
  hamburger?: boolean
  subTitle?: string
}>()

const siteConfig = useSiteConfig()
</script>

<template>
  <div class="sakura-navbar-brand">
    <template v-if="favicon">
      <img class="h-40px w-40px" alt="logo" :src="siteConfig.favicon">
    </template>
    <template v-if="title">
      <ruby class="navbar-title relative">
        <RouterLink class="logo-link" to="/" :aria-label="siteConfig.title">
          <template v-if="typeof title === 'string'">
            <span>{{ title }}</span>
          </template>
          <template v-else>
            <span mr1>{{ title![0] }}</span>
            <span mr1 class="sakura-hvr-rotate">{{ title![1] }}</span>
            <span>{{ title![2] }}</span>
          </template>
        </RouterLink>
        <rt v-if="subTitle" class="navbar-subtitle">
          {{ subTitle }}
        </rt>
      </ruby>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-navbar-brand {
  display: flex;
  align-items: center;
  white-space: nowrap;

  .logo-link {
    color: var(--sakura-navbar-title-color);
    font-size: 20px;
    font-weight: 600;
    line-height: normal;
    transition:
      font-size 0.3s ease,
      font-weight 0.3s ease;

    @include screen('md') {
      font-size: 22px;
      font-weight: 800;
    }

    @include screen('lg') {
      font-size: 24px;
    }

    span {
      display: inline-block;
    }

    span:first-child {
      border-radius: 9px;
    }

    &:hover {
      span:first-child {
        background-color: var(--sakura-color-primary);
        color: var(--sakura-navbar-bg);
      }

      // span:nth-of-type(2) {
      //   animation: rotate 1s linear infinite;
      // }

      span:not(:first-child) {
        color: var(--sakura-color-primary);
      }
    }
  }

  .navbar-title {
    ruby-position: under;
    font-variant-ligatures: no-common-ligatures;

    .navbar-subtitle {
      position: absolute;
      width: 100%;
      font-size: 12px;
      text-align: justify;
      text-align-last: justify;
      transform: translateY(-0.2em);
      opacity: 0;
      transition-property: opacity;
      transition-duration: 0.5s, 0.5s;

      // HACK: Safari has rendering issues with ruby/rt elements causing layout shifts
      @supports not (background: paint(xxx)) {
        display: none !important;
      }
    }

    &:hover {
      rt {
        color: var(--sakura-color-primary);
        opacity: 1;
      }
    }
  }
}
</style>

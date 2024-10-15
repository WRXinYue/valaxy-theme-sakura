<script setup lang="ts">
import { useSiteConfig } from 'valaxy'

defineProps<{
  favicon?: boolean
  navbarTitle?: string | string[]
  hamburger?: boolean
}>()

const siteConfig = useSiteConfig()
</script>

<template>
  <div class="mashiro-navbar-brand">
    <template v-if="favicon">
      <img class="h-40px w-40px" alt="logo" :src="siteConfig.favicon">
    </template>
    <template v-if="navbarTitle">
      <ruby class="mashiro-navbar-title">
        <RouterLink class="sakura-logo-link" to="/" :aria-label="siteConfig.title">
          <template v-if="typeof navbarTitle === 'string'">
            <span mr-1>{{ navbarTitle }}</span>
          </template>
          <template v-else>
            <span mr-1>{{ navbarTitle![0] }}</span>
            <span inline-block>{{ navbarTitle![1] }}</span>
            <span>{{ navbarTitle![2] }}</span>
          </template>
        </RouterLink>
        <rt>樱花庄的白猫</rt>
      </ruby>
    </template>
  </div>
</template>

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;

.mashiro-navbar-brand {
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;

  .sakura-logo-link {
    color: var(--sakura-c-navbar-text);
    font-size: 25px;
    font-weight: 600;

    @include screen('md') {
      font-size: 28px;
      font-weight: 800;
    }

    span:first-child {
      border-radius: 9px;
      padding-bottom: 2px;
      padding-top: 5px;
    }

    &:hover {
      span:first-child {
        background-color: var(--sakura-c-navbar-hover-bg-color);
        color: var(--sakura-c-navbar-hover-color);
      }

      span:nth-of-type(2) {
        animation: rotate 1.5s linear infinite;
      }

      span:not(:first-child) {
        color: var(--sakura-c-navbar-hover-bg-color);
      }
    }
  }

  ruby {
    position: absolute;
    ruby-position: under;

    rt {
      position: absolute;
      width: 100%;
      font-family: 'Merriweather Sans', Helvetica, Tahoma, Arial, 'PingFang SC',
        'Hiragino Sans GB', 'Microsoft Yahei', 'WenQuanYi Micro Hei', sans-serif;
      font-size: 10px;
      text-align: justify;
      text-align-last: justify;
      transform: translateY(-8px);
      opacity: 0;
      transition-property: opacity;
      transition-duration: 0.5s, 0.5s;
    }

    &:hover {
      rt {
        color: orange;
        opacity: 1;
      }
    }
  }
}
</style>

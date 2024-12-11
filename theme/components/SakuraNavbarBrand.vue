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
      <ruby class="sakura-navbar-title">
        <RouterLink class="sakura-logo-link" to="/" :aria-label="siteConfig.title">
          <template v-if="typeof title === 'string'">
            <span mr-1>{{ title }}</span>
          </template>
          <template v-else>
            <span mr-1>{{ title![0] }}</span>
            <span inline-block>{{ title![1] }}</span>
            <span>{{ title![2] }}</span>
          </template>
        </RouterLink>
        <rt v-if="subTitle" class="sakura-navbar-subtitle">
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
  overflow: hidden;
  white-space: nowrap;

  .sakura-logo-link {
    color: var(--sakura-navbar-text-color);
    font-family: Moe-Mashiro, sans-serif;
    font-size: 24px;
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
        background-color: var(--sakura-navbar-bg-hover-color);
        color: var(--sakura-navbar-text-hover-color);
      }

      span:nth-of-type(2) {
        animation: rotate 1s linear infinite;
      }

      span:not(:first-child) {
        color: var(--sakura-navbar-bg-hover-color);
      }
    }
  }

  .sakura-navbar-title {
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

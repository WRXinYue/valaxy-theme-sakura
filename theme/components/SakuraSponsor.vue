<script lang="ts" setup>
import { useSiteConfig } from 'valaxy'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const siteConfig = useSiteConfig()
const showQr = ref(false)
const sponsorBtnTitle = computed(() => {
  return siteConfig.value.sponsor?.title ?? t('reward.donate')
})
</script>

<template>
  <div class="flex-center flex-col">
    <button :title="sponsorBtnTitle" @click="showQr = !showQr">
      <div i-ri-heart-line class="animation-hvr-bounce-in color-red-400" />
    </button>

    <div class="flex-center qrcode-container qrcode flex-col" m="y-4" :class="showQr && 'show'">
      <div v-if="siteConfig.sponsor.description" class="sponsor-description" mb="4" text="sm">
        {{ siteConfig.sponsor.description }}
      </div>
      <div class="flex justify-around">
        <a
          v-for="method, i in siteConfig.sponsor.methods" :key="i"
          class="flex-center flex-col animate-fade-in animate-iteration-1"
          :href="method.url" target="_blank"
          :style="`color:${method.color}`"
        >
          <img class="sponsor-method-img" border="~ rounded" p="1" loading="lazy" :src="method.url" :title="method.name">
          <div text="xl" m="2" :class="method.icon" />
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sponsor-button {
  background-color: roklch(100% 0 0 / 10%);

  div {
    transform: scale(1.1);
    transition: transform var(--va-transition-duration) ease-in-out;
  }

  &:hover {
    background-color: oklch(100% 0 0 / 90%);

    div {
      transform: scale(1.2);
    }
  }

  a {
    &:hover {
      border: none;
    }
  }
}

.qrcode-container {
  overflow: hidden;
  height: 0;
  transition: height var(--va-transition-duration) ease-in-out;

  &.show {
    height: 260px;
  }
}

.sponsor-description {
  color: get-css-var('c-gray');
}

.sponsor-method-img {
  width: 12rem;
  max-width: 90%;
  aspect-ratio: 1;
}
</style>

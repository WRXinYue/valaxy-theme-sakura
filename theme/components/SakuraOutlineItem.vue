<script setup lang="ts">
import type { MenuItem } from 'valaxy'
import { useI18n } from 'vue-i18n'

defineProps<{
  headers: MenuItem[]
  onClick: (e: MouseEvent) => void
  root?: boolean
}>()

const { locale } = useI18n()
</script>

<template>
  <ul :class="root ? 'root' : 'nested'" class="va-toc css-i18n-toc">
    <li v-for="{ children, link, title, lang } in headers" :key="link" class="va-toc-item" :lang="lang || locale">
      <RouterLink :to="link" class="outline-link" :href="link" @click="onClick">
        {{ title }}
      </RouterLink>
      <template v-if="children?.length">
        <SakuraOutlineItem :headers="children" :on-click="onClick" />
      </template>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.root {
  position: relative;
  z-index: 1;
}

.nested {
  padding-left: 16px;
}

.outline-link {
  display: block;
  line-height: 28px;
  color: var(--va-c-text-light);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.5s;
  font-weight: 400;

  &:hover,
  &.active {
    color: var(--sakura-color-primary);
    transition: color 0.25s;
  }

  .nested {
    padding-left: 13px;
  }
}
</style>

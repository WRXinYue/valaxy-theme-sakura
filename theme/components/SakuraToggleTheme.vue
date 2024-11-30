<script setup lang="ts">
import { useSakuraAppStore } from '../stores'

const sakura = useSakuraAppStore()
</script>

<template>
  <SakuraDropdown class="sakura-toggle-theme">
    <template #button>
      <button class="sakura-icon-btn">
        <div i-ic-outline-palette />
      </button>
    </template>
    <template #menu>
      <button
        v-for="(theme, index) in sakura.themes"
        :key="index"
        class="theme-option"
        :style="{ backgroundColor: sakura.curTheme === theme ? '#e0f7fa' : 'none' }"
        @click="sakura.toggleTheme(theme)"
      >
        {{ theme.charAt(0).toUpperCase() + theme.slice(1) }}
      </button>
    </template>
  </SakuraDropdown>
</template>

<style lang="scss">
.sakura-toggle-theme {
  display: flex;

  .sakura-dropdown-menu {
    top: calc(var(--sakura-navbar-height) / 2 + 20px);
    left: unset;
    right: 0;
  }

  .theme-option {
    width: 100%;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    background: none;
    font-size: 0.9rem;
    transition: background-color 0.2s;

    &:hover {
      background-color: #e0f7fa;
    }
  }
}
</style>

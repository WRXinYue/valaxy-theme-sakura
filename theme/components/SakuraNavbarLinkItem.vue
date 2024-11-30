<script setup lang="ts">
import { ref } from 'vue'
import type { NavItem } from '../types'

const props = defineProps<Partial<NavItem>>()

const isDropdownVisible = ref(false)
const hideTimeout = ref<number | null>(null)
const delay = 50

function showDropdown() {
  isDropdownVisible.value = true
  cancelHideDropdown()
}

function hideDropdown() {
  isDropdownVisible.value = false
}

function scheduleHideDropdown() {
  hideTimeout.value = setTimeout(() => {
    hideDropdown()
  }, delay) as unknown as number
}

function cancelHideDropdown() {
  if (hideTimeout.value !== null) {
    clearTimeout(hideTimeout.value)
    hideTimeout.value = null
  }
}
</script>

<template>
  <SakuraDropdown :is-show="!!items?.length" class="sakura-navbar-link-item" @mouseenter="showDropdown" @mouseleave="scheduleHideDropdown">
    <template #button>
      <SakuraNavLink v-bind="props" />
    </template>

    <template #menu>
      <div class="sakura-dropdown-list" flex="~ col center">
        <SakuraNavLink v-for="subitem in items" :key="subitem.text" v-bind="subitem" />
      </div>
    </template>
  </SakuraDropdown>
</template>

<style lang="scss">
.sakura-navbar-link-item {
  display: flex;
  justify-content: center;

  a {
    color: var(--sakura-text-color);

    &:hover {
      color: var(--sakura-primary-color);
    }
  }

  & > .sakura-nav-link {
    &:hover::after {
      width: 100%;
    }

    &::after {
      content: '';
      position: absolute;
      width: 0;
      left: 0;
      bottom: 0;
      height: var(--sakura-navbar-marker-height);
      background-color: var(--sakura-navbar-marker-color);
      transition: width 0.3s ease;
    }
  }

  .sakura-dropdown-list {
    .sakura-nav-link:not(:last-child) {
      margin-bottom: 15px;
    }
  }
}
</style>

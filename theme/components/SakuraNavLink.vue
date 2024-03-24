<script setup lang="ts">
import { ref } from 'vue'
import type { NavItem } from '../types'

defineProps<{
  text: string
  link: string
  icon?: string
  isExternal?: boolean
  submenu?: NavItem[]
}>()

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
  <AppLink v-if="!isExternal" id="dropdownNavbarLink" :to="link" rel="noopener" class="sakura-navbar-link" @mouseenter="showDropdown" @mouseleave="scheduleHideDropdown">
    <div :class="icon" class="mr-0.5" />
    {{ text }}
  </AppLink>
  <a v-else id="dropdownNavbarLink" :href="link" rel="noopener" class="sakura-navbar-link" @mouseenter="showDropdown" @mouseleave="scheduleHideDropdown">
    <div :class="icon" class="mr-0.5" />
    {{ text }}
  </a>
  <!-- Dropdown menu -->
  <div
    v-if="isDropdownVisible && submenu?.length"
    class="min-w-20 w-auto h-auto z-3 absolute element-slide-in-gently"
    @mouseenter="showDropdown"
    @mouseleave="scheduleHideDropdown"
  >
    <ul
      id="dropdownNavbar"
      aria-labelledby="dropdownLargeButton"
      class="rounded bg-$st-c-bg-nav mt-3 py-2 px-0"
    >
      <li v-for="subitem in submenu" :key="subitem.text" class="py-2 justify-center flex">
        <AppLink v-if="!subitem.isExternal" :to="subitem.link" rel="noopener" class="sakura-navbar-link flex items-center mx-2">
          <div :class="icon" class="mr-0.5" />
          <span truncate>
            {{ subitem.text }}
          </span>
        </AppLink>
        <a v-else :href="subitem.link" rel="noopener" class="sakura-navbar-link">
          <div :class="subitem.icon" class="mr-0.5" />
          <span truncate>
            {{ subitem.text }}
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
#dropdownNavbar {
  box-shadow: 0 1px 40px -8px rgba(0,0,0,.5);
}

#dropdownNavbar::before {
  content: "";
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid var(--st-c-bg-nav);
}

.sakura-navbar-link {
  height: 100%;
  color: var(--st-c-text);
  position: relative;
  display: flex;
  align-items: center;

  &:hover {
    color: var(--st-c-secondary);

    &::after {
      width: 100%;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: var(--st-c-sidebar-marker-h);
    background-color: var(--st-c-secondary);
    transition: width 0.3s ease;
  }
}
</style>

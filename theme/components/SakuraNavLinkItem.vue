<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { NavItem } from '../types'

withDefaults(defineProps<{
  animIn?: string | string[]
  animOut?: string | string[]
} & NavItem>(), {})

const { t } = useI18n()

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
  <div
    class="sakura-navbar-link-item"
    :aria-haspopup="!!children" :aria-expanded="!isDropdownVisible"
    @mouseenter="showDropdown" @mouseleave="scheduleHideDropdown"
  >
    <AppLink id="dropdown-navbarLink" :title="locale ? `${text} ${t(locale)}` : text" :to="link" :target="target" rel="noopener">
      <span :class="icon" inline-flex class="mr-0.5" />
      <span> {{ locale ? `${text} ${t(locale)}` : text }} </span>
    </AppLink>
    <div
      v-if="children?.length"
      v-show="isDropdownVisible"
      :class="isDropdownVisible ? animIn : animOut"
      class="absolute z-3 min-w-20 w-auto"
      style="transform: translateY(var(--st-c-navbar-height))"
      @mouseenter="showDropdown"
      @mouseleave="scheduleHideDropdown"
    >
      <ul
        id="dropdown-navbar"
        aria-labelledby="dropdownLargeButton"
        class="mt-3 rounded bg-$st-c-bg-nav px-0"
      >
        <li v-for="subitem in children" :key="subitem.text" class="flex justify-center">
          <AppLink :to="subitem.link" :target="subitem.target" rel="noopener" class="sakura-navbar-link-item mx-2 flex items-center">
            <span :class="subitem.icon" inline-flex class="mr-0.5" />
            <span truncate py-2>
              {{ subitem.locale ? `${subitem.text} ${t(subitem.locale)}` : subitem.text }}
            </span>
          </AppLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
#dropdown-navbar {
  box-shadow: 0 1px 40px -8px rgba(0, 0, 0, 0.5);

  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid var(--st-c-bg-nav);
  }
}

.sakura-navbar-link-item {
  display: flex;
  justify-content: center;

  a {
    color: var(--st-c-text);

    &:hover {
      color: var(--st-c-secondary);
    }
  }

  > a {
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;

    &:hover::after {
      width: 100%;
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
}
</style>

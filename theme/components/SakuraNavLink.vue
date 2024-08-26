<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { NavItem } from '../types/index'
import { useThemeConfig } from '../composables'

const props = withDefaults(defineProps<{
  navbar?: NavItem[]
  col?: boolean
}>(), {
  col: false,
})

const themeConfig = useThemeConfig()
const route = useRoute()
const { locale, t } = useI18n()

const marker = ref()
const isDropdownVisible = ref(false)
const hideTimeout = ref<number | null>(null)
const delay = 50

const navbar = computed(() => (props.navbar || themeConfig.value.navbar))
const navbarOptions = computed(() => themeConfig.value.navbarOptions)
const showMarker = computed(() => themeConfig.value.navbarOptions?.showMarker)

watch(() => route.path, () => {
  nextTick(updateMarker)
})

watch(() => locale.value, () => {
  setTimeout(() => updateMarker(), 0)
})

function updateMarker() {
  if (!showMarker.value)
    return

  const routeActive = document.querySelector('.sakura-nav-link .router-link-active') as HTMLElement
  if (!routeActive)
    return

  if (props.col) {
    marker.value.style.top = `${routeActive.offsetTop}px`
    marker.value.style.height = `${routeActive.offsetHeight}px`
  }
  else {
    marker.value.style.left = `${routeActive.offsetLeft}px`
    marker.value.style.width = `${routeActive.offsetWidth}px`
  }
}

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

onMounted(() => {
  nextTick(() => updateMarker())
  marker.value = document.querySelector('.sakura-nav-link #marker')
})
</script>

<template>
  <nav class="sakura-nav-link">
    <ul class="sakura-nav-link-menu">
      <li v-for="(item, i) in navbar" :key="i" class="sakura-nav-link-item">
        <AppLink
          id="dropdown-navbarLink" :title="item.locale ? `${item.text} ${t(item.locale)}` : item.text" :to="item.link"
          :target="item.target" rel="noopener" @mouseenter="showDropdown" @mouseleave="scheduleHideDropdown"
        >
          <span :class="item.icon" inline-flex class="mr-0.5" />
          <span> {{ item.locale ? `${item.text} ${t(item.locale)}` : item.text }} </span>
        </AppLink>

        <ul
          v-if="item.children?.length"
          v-show="isDropdownVisible"
          id="dropdown-navbar"
          aria-labelledby="dropdownLargeButton"
          :class="isDropdownVisible ? navbarOptions?.animIn : navbarOptions?.animOut"
          class="sakura-nav-link-submenu"
          @mouseenter="showDropdown"
          @mouseleave="scheduleHideDropdown"
        >
          <li v-for="subitem in item.children" :key="subitem.text" class="sakura-nav-link-subitem flex justify-center">
            <AppLink :to="subitem.link" :target="subitem.target" rel="noopener" class="mx-2 flex items-center">
              <span :class="subitem.icon" inline-flex class="mr-0.5" />
              <span truncate py-2>
                {{ subitem.locale ? `${subitem.text} ${t(subitem.locale)}` : subitem.text }}
              </span>
            </AppLink>
          </li>
        </ul>
      </li>
    </ul>

    <div v-if="showMarker" id="marker" />
  </nav>
</template>

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-nav-link {
  a {
    white-space: nowrap;
    text-align: center;
    font-size: 0.875rem;
    color: rgba(107, 114, 128, var(--un-text-opacity));
    line-height: 1.25rem;
  }

  #marker {
    position: absolute;
    border-bottom: var(--st-c-sidebar-marker-h) solid var(--st-c-secondary);
    transition-property: opacity, left, top;
    transition-duration: 0.5s;
    pointer-events: none;
    bottom: 0;
  }

  @include screen('md') {
    display: flex;
  }

  &-menu {
    display: flex;
  }

  &-item > a {
    align-items: center;
    display: flex;
    height: var(--st-c-navbar-height);
    margin: 0 10px;
    position: relative;

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
}

.sakura-nav-link-submenu {
  position: absolute;
  background-color: var(--st-c-bg-nav);
}

#dropdown-navbar {
  box-shadow: 0 1px 40px -8px rgba(0, 0, 0, 0.5);
}

#dropdown-navbar::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid var(--st-c-bg-nav);
}
</style>

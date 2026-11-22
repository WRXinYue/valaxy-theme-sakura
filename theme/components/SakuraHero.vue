<script lang="ts" setup>
import type { $Transition } from 'motion-v'
import type { Hero } from '../types/index'
import { motion } from 'motion-v'
import { useLocale, useSiteConfig } from 'valaxy'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeConfig } from '../composables'
import { isVideoUrl, isYouTubeUrl } from '../core/utils'
import { useSakuraAppStore } from '../stores'
import SakuraHeroBackground from './SakuraHeroBackground.vue'
import SakuraHeroMediaList from './SakuraHeroMediaList.vue'
import SakuraHomeNavbar from './SakuraHomeNavbar.vue'
import SakuraNotice from './SakuraNotice.vue'
import SakuraWaveFish from './SakuraWaveFish.vue'
import SakuraWaveRipple from './SakuraWaveRipple.vue'

const props = defineProps<{
  hero?: Hero
}>()

const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()
const appStore = useSakuraAppStore()

const hero = computed(() => props.hero || themeConfig.value.hero)
const titleSweeping = ref(false)
let titleSweepTimer: ReturnType<typeof setTimeout> | undefined

const heroUrls = computed(() => {
  const urls = hero.value?.urls
  if (Array.isArray(urls))
    return urls
  return urls
    ? [urls]
    : []
})
const currentHeroUrl = computed(() => heroUrls.value[appStore.wallpaperDisplayIndex] || '')
const canPlayCurrent = computed(() => isVideoUrl(currentHeroUrl.value) || isYouTubeUrl(currentHeroUrl.value))

function toggleHeroPlayMode() {
  if (appStore.introTransitioning || !canPlayCurrent.value)
    return
  appStore.togglePlayPause()
}

function onTitleClick() {
  if (appStore.introTransitioning || appStore.wallpaperIsPlaying || titleSweeping.value)
    return
  titleSweeping.value = true
  titleSweepTimer = setTimeout(() => {
    titleSweeping.value = false
  }, 1200)
}
const overlayBarClass = computed(() => appStore.wallpaperIsPlaying ? 'sakura-fade-out-down' : 'sakura-fade-in-up')
const brandTitle = computed(() => siteConfig.value.title || '')
const showBrandFavicon = computed(() => themeConfig.value.navbarOptions?.favicon !== false && !!siteConfig.value.favicon)
const showHeroBrand = computed(() => !!brandTitle.value || showBrandFavicon.value)
const heroSocialLinks = computed(() => siteConfig.value.social || [])
const heroSideNavItems = computed(() => {
  const items = [
    { id: 'sakura-home', label: 'Home' },
    { id: 'sakura-home-discovery', label: themeConfig.value.postList?.text || 'Discovery' },
  ].filter(Boolean) as Array<{ id: string, label: string }>
  return items
})
const sideNavRootEl = ref<HTMLElement | null>(null)
const isSideNavExpanded = ref(false)
const activeSideNavId = ref('sakura-home')
const hoveredSideNavId = ref<string | null>(null)
const emphasizedSideNavId = computed(() => hoveredSideNavId.value || activeSideNavId.value)
let sideNavSectionObserver: IntersectionObserver | undefined

const { locale, availableLocales } = useI18n()
const { toggleLocale } = useLocale()
const isLangMenuOpen = ref(false)
const langMenuRootEl = ref<HTMLElement | null>(null)

const langMenuTransition: $Transition = {
  duration: 0.22,
  ease: [0.19, 1, 0.22, 1],
}

function localeLabel(v: string) {
  const normalized = v.toLowerCase()
  if (normalized.startsWith('zh'))
    return '中文'
  if (normalized.startsWith('en'))
    return 'EN'
  return v.toUpperCase()
}

const currentLocaleLabel = computed(() => localeLabel(locale.value))
const langMenuAnimate = computed(() => {
  if (isLangMenuOpen.value) {
    return {
      opacity: 1,
      y: 0,
      scale: 1,
    }
  }
  return {
    opacity: 0,
    y: -6,
    scale: 0.98,
  }
})

function closeLangMenu() {
  isLangMenuOpen.value = false
}

function toggleLangMenu() {
  isLangMenuOpen.value = !isLangMenuOpen.value
}

function selectLocale(nextLocale: string) {
  toggleLocale(nextLocale)
  closeLangMenu()
}

function onDocumentPointerDown(event: Event) {
  if (!isLangMenuOpen.value)
    return
  const target = event.target
  if (!(target instanceof Node))
    return
  if (langMenuRootEl.value?.contains(target))
    return
  closeLangMenu()
}

function scrollToAnchor(id: string) {
  const el = document.getElementById(id)
  if (!el)
    return
  activeSideNavId.value = id
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function expandSideNav() {
  isSideNavExpanded.value = true
}

function collapseSideNav() {
  hoveredSideNavId.value = null
  isSideNavExpanded.value = false
}

function onSideNavItemEnter(id: string) {
  hoveredSideNavId.value = id
}

function onSideNavItemLeave(id: string) {
  if (hoveredSideNavId.value === id)
    hoveredSideNavId.value = null
}

function onSideNavFocusOut() {
  requestAnimationFrame(() => {
    const active = document.activeElement
    if (active instanceof Node && sideNavRootEl.value?.contains(active))
      return
    collapseSideNav()
  })
}

function initSideNavSectionObserver() {
  sideNavSectionObserver?.disconnect()
  sideNavSectionObserver = undefined
  if (typeof window === 'undefined' || !('IntersectionObserver' in window))
    return

  const navbarHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sakura-navbar-height')) || 0
  const rootMargin = `${-(navbarHeight + 16)}px 0px -60% 0px`

  sideNavSectionObserver = new IntersectionObserver(() => {
    scheduleSideNavActiveUpdate()
  }, {
    root: null,
    rootMargin,
    threshold: [0, 1],
  })

  for (const item of heroSideNavItems.value) {
    const el = document.getElementById(item.id)
    if (el)
      sideNavSectionObserver.observe(el)
  }

  scheduleSideNavActiveUpdate()
}

function retryInitSideNavSectionObserver(timesLeft = 24) {
  initSideNavSectionObserver()
  const hasAllTargets = heroSideNavItems.value.every(i => !!document.getElementById(i.id))
  if (sideNavSectionObserver && hasAllTargets)
    return
  if (timesLeft <= 0)
    return
  requestAnimationFrame(() => retryInitSideNavSectionObserver(timesLeft - 1))
}

let sideNavActiveRaf: number | undefined
function computeActiveSideNavId() {
  const navbarHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sakura-navbar-height')) || 0
  const thresholdTop = navbarHeight + 16
  const points = heroSideNavItems.value
    .map((item) => {
      const el = document.getElementById(item.id)
      const top = el
        ? el.getBoundingClientRect().top
        : Number.NaN
      return { id: item.id, top }
    })
    .filter(p => Number.isFinite(p.top))

  if (!points.length)
    return ''

  const above = points.filter(p => p.top <= thresholdTop).sort((a, b) => b.top - a.top)
  if (above.length)
    return above[0].id

  const below = points.sort((a, b) => a.top - b.top)
  return below[0].id
}

function scheduleSideNavActiveUpdate() {
  if (typeof window === 'undefined')
    return
  if (sideNavActiveRaf !== undefined)
    cancelAnimationFrame(sideNavActiveRaf)
  sideNavActiveRaf = requestAnimationFrame(() => {
    sideNavActiveRaf = undefined
    const next = computeActiveSideNavId()
    if (next)
      activeSideNavId.value = next
  })
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape')
    closeLangMenu()
}

const heroRef = ref<unknown>(null)
const heroEl = ref<HTMLElement | null>(null)
const decoWordEl = ref<HTMLElement | null>(null)
const bottomPushTargetRaw = ref('0px')
const navbarHeightPx = ref('0px')
const heroFrameWidthPx = ref('0px')
const isBottomBarStuck = ref(false)

function resolveHeroEl(): HTMLElement | null {
  if (heroEl.value)
    return heroEl.value

  const v = heroRef.value
  if (v instanceof HTMLElement) {
    heroEl.value = v
    return v
  }

  const maybeEl = (v as any)?.$el
  if (maybeEl instanceof HTMLElement) {
    heroEl.value = maybeEl
    return maybeEl
  }

  heroEl.value = document.querySelector<HTMLElement>('.sakura-hero')
  return heroEl.value
}

const resolvedBottomPush = computed(() => {
  const raw = bottomPushTargetRaw.value.trim()
  if (!raw || raw === '0px')
    return '0px'

  if (raw.startsWith('var(')) {
    const resolved = navbarHeightPx.value.trim()
    if (resolved)
      return resolved

    const commaIndex = raw.lastIndexOf(',')
    const closeIndex = raw.lastIndexOf(')')
    if (commaIndex !== -1 && closeIndex !== -1 && commaIndex < closeIndex)
      return raw.slice(commaIndex + 1, closeIndex).trim() || '0px'
    return '0px'
  }

  return raw
})

const resolvedHeroHeightShrink = computed(() => {
  return navbarHeightPx.value.trim() || '0px'
})

function updateBottomBarStuck() {
  const el = resolveHeroEl()
  if (!el)
    return
  isBottomBarStuck.value = el.getBoundingClientRect().bottom <= 0.5
}

function onDocumentScroll() {
  scheduleSideNavActiveUpdate()
  updateBottomBarStuck()
}

const bottomPushTransition: $Transition = {
  duration: 0,
}

const heroAnimate = computed(() => {
  return {
    '--sakura-hero-bottom-push': resolvedBottomPush.value,
    '--sakura-hero-height-shrink': resolvedHeroHeightShrink.value,
    '--sakura-hero-frame-bottom-width': '0px',
  } as any
})

let heroStyleObserver: MutationObserver | undefined

function syncBottomPushTargetRaw() {
  const el = resolveHeroEl()
  if (!el)
    return
  const v = el.style.getPropertyValue('--sakura-hero-bottom-push-target')
  bottomPushTargetRaw.value = (v && v.trim())
    ? v.trim()
    : '0px'
}

function syncNavbarHeight() {
  navbarHeightPx.value = getComputedStyle(document.documentElement).getPropertyValue('--sakura-navbar-height').trim() || '0px'
}

function syncHeroFrameWidth() {
  const el = resolveHeroEl()
  if (!el)
    return
  heroFrameWidthPx.value = getComputedStyle(el).getPropertyValue('--sakura-hero-frame-width').trim() || '0px'
}

watch(() => appStore.wallpaperIsPlaying, (isPlaying) => {
  const live2dToolQuitElement = document.querySelector('#live2d-tool-quit')
  const live2dToolElement = document.querySelector('#live2d-tools')

  const shouldClickQuit = (isPlaying && live2dToolElement?.className === 'show')
    || (!isPlaying && live2dToolElement?.className === 'hide')

  if (shouldClickQuit && live2dToolQuitElement instanceof HTMLElement)
    live2dToolQuitElement.click()
})

function onWindowResize() {
  syncNavbarHeight()
  syncHeroFrameWidth()
  fitHeroTitle()
  retryInitSideNavSectionObserver(2)
}

function fitHeroTitle() {
  const heroElement = heroEl.value
  const wordElement = decoWordEl.value
  if (!heroElement || !wordElement)
    return

  const root = document.documentElement
  root.style.removeProperty('--sakura-hero-title-size')

  const baseSize = Number.parseFloat(getComputedStyle(wordElement).fontSize)
  if (!baseSize)
    return

  const offsetValue = getComputedStyle(heroElement).getPropertyValue('--sakura-hero-topbar-offset-x')
  const offset = Number.parseFloat(offsetValue) || 36
  const available = heroElement.clientWidth - offset * 2
  if (available <= 0)
    return

  const textWidth = wordElement.scrollWidth
  if (textWidth <= available)
    return

  const fitted = Math.max(12, Math.floor(((baseSize * available) / textWidth) * 0.98))
  root.style.setProperty('--sakura-hero-title-size', `${fitted}px`)
}

watch(() => hero.value.title, () => nextTick(fitHeroTitle))

onMounted(() => {
  syncNavbarHeight()
  resolveHeroEl()
  syncHeroFrameWidth()
  syncBottomPushTargetRaw()
  if (!heroEl.value)
    return
  heroStyleObserver = new MutationObserver(() => syncBottomPushTargetRaw())
  heroStyleObserver.observe(heroEl.value, {
    attributes: true,
    attributeFilter: ['style'],
  })
  window.addEventListener('resize', onWindowResize, { passive: true })
  document.addEventListener('scroll', onDocumentScroll, { passive: true })
  document.addEventListener('pointerdown', onDocumentPointerDown, { passive: true })
  document.addEventListener('keydown', onDocumentKeydown)
  retryInitSideNavSectionObserver()
  updateBottomBarStuck()
  fitHeroTitle()
  document.fonts?.ready.then(() => fitHeroTitle())
})

onBeforeUnmount(() => {
  clearTimeout(titleSweepTimer)
  window.removeEventListener('resize', onWindowResize)
  heroStyleObserver?.disconnect()
  heroStyleObserver = undefined
  sideNavSectionObserver?.disconnect()
  sideNavSectionObserver = undefined
  document.removeEventListener('scroll', onDocumentScroll)
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  document.removeEventListener('keydown', onDocumentKeydown)
  document.documentElement.style.removeProperty('--sakura-hero-title-size')
})
</script>

<template>
  <motion.header
    ref="heroRef"
    class="sakura-hero"
    :class="{ 'is-playing': appStore.wallpaperIsPlaying }"
    :initial="false"
    :animate="heroAnimate"
    :transition="bottomPushTransition"
  >
    <div v-if="showHeroBrand" class="sakura-hero-brand">
      <RouterLink class="sakura-hero-brand-link" to="/" :aria-label="siteConfig.title">
        <img v-if="showBrandFavicon" class="sakura-hero-brand-logo" alt="logo" :src="siteConfig.favicon">
        <span v-if="brandTitle" class="sakura-hero-brand-title">{{ brandTitle }}</span>
      </RouterLink>
    </div>

    <div ref="langMenuRootEl" class="sakura-hero-top-right">
      <div class="sakura-hero-lang">
        <motion.button
          class="sakura-hero-lang-btn"
          type="button"
          aria-haspopup="menu"
          :aria-expanded="isLangMenuOpen"
          @click.stop="toggleLangMenu"
        >
          <span class="sakura-hero-lang-btn-text">{{ currentLocaleLabel }}</span>
          <motion.span
            class="sakura-hero-lang-btn-caret"
            :initial="false"
            :animate="{ rotate: isLangMenuOpen ? 180 : 0 }"
            :transition="langMenuTransition"
          >
            <div i-solar-alt-arrow-down-bold />
          </motion.span>
        </motion.button>

        <motion.div
          class="sakura-hero-lang-menu"
          role="menu"
          :initial="false"
          :animate="langMenuAnimate"
          :transition="langMenuTransition"
          :style="{ pointerEvents: isLangMenuOpen ? 'auto' : 'none' }"
        >
          <button
            v-for="l in availableLocales"
            :key="l"
            class="sakura-hero-lang-menu-item"
            type="button"
            role="menuitemradio"
            :aria-checked="locale === l"
            @click="selectLocale(l)"
          >
            <span class="sakura-hero-lang-menu-label">{{ localeLabel(l) }}</span>
            <span v-if="locale === l" class="sakura-hero-lang-menu-check">✓</span>
          </button>
        </motion.div>
      </div>
    </div>

    <div class="sakura-hero-capsule">
      <slot name="notice">
        <SakuraNotice />
      </slot>
    </div>

    <div class="sakura-hero-inner">
      <div class="absolute inset-0 overflow-hidden" :class="[!appStore.wallpaperIsPlaying && hero.style && 'hero-style', hero.style]">
        <slot name="background">
          <SakuraHeroBackground :urls="hero?.urls" @click="toggleHeroPlayMode" />
        </slot>

        <div v-if="hero?.waveTheme" class="sakura-hero-overlay-bar" :class="[overlayBarClass]">
          <slot name="overlay-bar">
            <SakuraWaveFish v-if="hero.waveTheme === 'fish'" />
            <SakuraWaveRipple v-else-if="hero.waveTheme === 'ripple'" />
          </slot>
        </div>
      </div>
    </div>

    <SakuraHeroMediaList />

    <div v-if="hero?.title || heroSocialLinks.length" class="sakura-hero-deco-wrap">
      <div v-if="hero?.title" class="sakura-hero-deco" :class="{ 'is-intro-hidden': appStore.introTransitioning }" aria-hidden="true">
        <span
          ref="decoWordEl"
          class="sakura-hero-deco-word"
          :data-text="hero.title"
          @click="onTitleClick"
        >
          {{ hero.title }}
          <span class="sakura-hero-deco-sweep" :class="{ 'is-sweeping': titleSweeping }" aria-hidden="true">{{ hero.title }}</span>
        </span>
      </div>

      <div v-if="heroSocialLinks.length" class="sakura-hero-social-line" :class="{ 'is-revealed': !appStore.introTransitioning }" aria-hidden="true" />

      <div v-if="heroSocialLinks.length" class="sakura-hero-social" :class="{ 'is-revealed': !appStore.introTransitioning }">
        <div class="sakura-hero-social-links">
          <a
            v-for="item, i in heroSocialLinks"
            :key="i"
            class="sakura-hero-social-link"
            rel="noopener"
            :href="item.link"
            :title="item.name"
            target="_blank"
            :style="`${item.color ? `--sakura-hero-social-accent:${item.color};` : ''}--sakura-hero-social-index:${i};`"
          >
            <div class="sakura-hero-social-icon" :class="item.icon" />
          </a>
        </div>
      </div>
    </div>

    <SakuraHeroCarousel :class="{ 'is-intro-hidden': appStore.introTransitioning }" />

    <nav
      v-if="heroSideNavItems.length"
      ref="sideNavRootEl"
      class="sakura-hero-side-nav"
      aria-label="Home section navigation"
      @mouseenter="expandSideNav"
      @mouseleave="collapseSideNav"
      @focusin="expandSideNav"
      @focusout="onSideNavFocusOut"
    >
      <motion.a
        v-for="item in heroSideNavItems"
        :key="item.id"
        class="sakura-hero-side-nav-entry"
        :href="`#${item.id}`"
        :aria-label="item.label"
        @click.prevent="scrollToAnchor(item.id)"
        @mouseenter="onSideNavItemEnter(item.id)"
        @mouseleave="onSideNavItemLeave(item.id)"
      >
        <motion.span
          class="sakura-hero-side-nav-line"
          aria-hidden="true"
          :initial="false"
          :animate="{
            opacity: isSideNavExpanded ? 0 : (emphasizedSideNavId === item.id ? 1 : 0.35),
            scaleX: isSideNavExpanded ? 0 : 1,
          }"
          :transition="{ duration: 0.18, ease: [0.19, 1, 0.22, 1] }"
        />
        <motion.span
          class="sakura-hero-side-nav-label"
          :initial="false"
          :animate="{
            opacity: isSideNavExpanded ? (emphasizedSideNavId === item.id ? 1 : 0.35) : 0,
            x: isSideNavExpanded ? (emphasizedSideNavId === item.id ? 0 : 4) : 8,
          }"
          :transition="{ duration: 0.22, ease: [0.19, 1, 0.22, 1] }"
        >
          {{ item.label }}
        </motion.span>
      </motion.a>
    </nav>
  </motion.header>

  <div v-if="isBottomBarStuck" class="sakura-hero-bottom-area-spacer" aria-hidden="true" />

  <div
    class="sakura-hero-bottom-area"
    :class="{ 'is-stuck': isBottomBarStuck }"
  >
    <SakuraHomeNavbar :stuck="isBottomBarStuck" />
  </div>
</template>

<style lang="scss">
.sakura-hero {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  --sakura-hero-topbar-offset-y: calc(var(--sakura-hero-frame-width) + 24px);
  --sakura-hero-topbar-offset-x: calc(var(--sakura-hero-frame-width) + 24px);
  --sakura-hero-bottom-push: 0px;
  --sakura-hero-height-shrink: 0px;
  --sakura-hero-frame-color: oklch(from var(--sakura-navbar-bg) l c h / 100%);
  --sakura-hero-frame-overlap: 1px;
  --sakura-hero-frame-width: 12px;
  --sakura-hero-frame-bottom-width: var(--sakura-hero-frame-width);
  --sakura-hero-frame-radius: clamp(24px, 2.5vw, 32px);
  --sakura-hero-frame-radius-default: var(--sakura-hero-frame-radius);
  --sakura-hero-corner-hit-size: clamp(18px, 3vw, 48px);
  --sakura-hero-edge-hit-thickness: clamp(12px, 2vw, 28px);
  --sakura-hero-edge-line-length: clamp(90px, 20vw, 300px);
  --sakura-hero-edge-line-thickness: 2px;
  --sakura-hero-hit-offset: clamp(6px, calc(var(--sakura-hero-frame-width) * 0.75), 16px);

  background-color: var(--sakura-hero-frame-color);
  border-radius: var(--sakura-hero-frame-radius-tl, var(--sakura-hero-frame-radius-default))
    var(--sakura-hero-frame-radius-tr, var(--sakura-hero-frame-radius-default))
    var(--sakura-hero-frame-radius-br, var(--sakura-hero-frame-radius-default))
    var(--sakura-hero-frame-radius-bl, var(--sakura-hero-frame-radius-default));
  overflow: visible;
  height: calc(100dvh - var(--sakura-hero-height-shrink));

  .sakura-glitch-text {
    font-family: Ubuntu, sans-serif;
  }
}

.sakura-hero-bottom-area {
  width: 100%;
  height: var(--sakura-navbar-height);
  overflow: hidden;
}

.sakura-hero-bottom-area.is-stuck {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 90;
}

.sakura-hero-bottom-area-spacer {
  width: 100%;
  height: var(--sakura-navbar-height);
}

.sakura-hero-inner {
  position: absolute;
  inset: var(--sakura-hero-frame-width) var(--sakura-hero-frame-width)
    calc(var(--sakura-hero-frame-bottom-width) + var(--sakura-hero-bottom-push)) var(--sakura-hero-frame-width);
  border-radius: var(--sakura-hero-frame-radius-tl, var(--sakura-hero-frame-radius-default))
    var(--sakura-hero-frame-radius-tr, var(--sakura-hero-frame-radius-default))
    var(--sakura-hero-frame-radius-br, var(--sakura-hero-frame-radius-default))
    var(--sakura-hero-frame-radius-bl, var(--sakura-hero-frame-radius-default));
  overflow: hidden;
}

.sakura-hero-deco-wrap {
  position: absolute;
  left: var(--sakura-hero-topbar-offset-x);
  bottom: calc(var(--sakura-hero-frame-bottom-width) + var(--sakura-hero-bottom-push) + 24px);
  z-index: 6;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.sakura-hero-deco {
  display: flex;
  gap: clamp(10px, 2vw, 28px);
  align-items: baseline;
  font-size: var(--sakura-hero-title-size, clamp(72px, 13vw, 220px));
  line-height: 0.9;
  letter-spacing: -0.04em;
  white-space: pre-line;
  color: var(--sakura-color-background);
  user-select: none;
  transition: opacity 0.35s ease;

  &.is-intro-hidden {
    opacity: 0;
  }
}

.sakura-hero-deco-word {
  position: relative;
  display: inline-block;
  flex: none;
  font-weight: 900;
  pointer-events: auto;
  cursor: pointer;

  &::before,
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    clip-path: inset(50% 0 50% 0);
    content: attr(data-text);
    pointer-events: none;
  }

  &::before {
    left: -1px;
    text-shadow: 1px 0 var(--sakura-color-glitch-before);
  }

  &::after {
    left: 1px;
    text-shadow: -1px 0 var(--sakura-color-glitch-after);
  }

  @media (hover: hover) {
    &:hover {
      &::before {
        text-shadow: 4px 0 var(--sakura-color-glitch-before);
        animation: sakura-hero-glitch-1 0.8s infinite ease-in-out alternate-reverse;
      }

      &::after {
        text-shadow: -4px 0 var(--sakura-color-glitch-after);
        animation: sakura-hero-glitch-2 0.8s infinite ease-in-out alternate-reverse;
      }
    }
  }

  & .sakura-hero-deco-sweep {
    position: absolute;
    inset: 0;
    z-index: 2;
    white-space: pre-line;
    pointer-events: none;
    user-select: none;
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      transparent 34%,
      oklch(85.31% 0.067 228.7) 38%,
      oklch(73.03% 0.094 295.3) 42%,
      oklch(81.79% 0.095 354.5) 46%,
      oklch(83.63% 0.095 47.8) 50%,
      oklch(95.61% 0.098 100.5) 54%,
      oklch(86.39% 0.104 145.8) 58%,
      transparent 64%,
      transparent 100%
    );
    background-clip: text;
    background-position: 100% 0;
    background-repeat: no-repeat;
    background-size: 300% 100%;
    color: transparent;
    opacity: 0;

    &.is-sweeping {
      opacity: 1;
      animation: sakura-hero-title-sweep 1.15s ease-in-out forwards;
    }
  }
}

@keyframes sakura-hero-title-sweep {
  from {
    background-position: 100% 0;
  }

  to {
    background-position: 0 0;
  }
}

@keyframes sakura-hero-glitch-1 {
  0% {
    clip-path: inset(2% 0 86% 0);
  }

  25% {
    clip-path: inset(20% 0 58% 0);
  }

  50% {
    clip-path: inset(38% 0 40% 0);
  }

  75% {
    clip-path: inset(56% 0 22% 0);
  }

  100% {
    clip-path: inset(74% 0 4% 0);
  }
}

@keyframes sakura-hero-glitch-2 {
  0% {
    top: -1px;
    left: 1px;
    clip-path: inset(10% 0 74% 0);
  }

  25% {
    top: -6px;
    left: 4px;
    clip-path: inset(30% 0 52% 0);
  }

  50% {
    top: -3px;
    left: 2px;
    clip-path: inset(16% 0 68% 0);
  }

  75% {
    top: 0;
    left: -4px;
    clip-path: inset(60% 0 26% 0);
  }

  100% {
    top: -1px;
    left: -1px;
    clip-path: inset(44% 0 40% 0);
  }
}

.sakura-hero-social {
  pointer-events: auto;
}

.sakura-hero-social-line {
  height: 1px;
  width: 100%;
  background: var(--sakura-color-background);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.9s cubic-bezier(0.19, 1, 0.22, 1) 0.55s;

  &.is-revealed {
    transform: scaleX(1);
  }
}

.sakura-hero-social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.sakura-hero-social-link {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  text-decoration: none;
  opacity: 0;
  transform: translateY(10px) scale(0.92);
  transition:
    opacity 0.5s ease,
    transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  transition-delay: calc(var(--sakura-hero-social-index, 0) * 60ms + 620ms);

  --sakura-hero-social-accent: var(--sakura-color-background);

  background: oklch(from var(--sakura-color-background) l c h / 10%);
  border: 1px solid oklch(from var(--sakura-color-background) l c h / 28%);
  backdrop-filter: blur(10px);
  color: var(--sakura-color-background);
}

.sakura-hero-social-link:hover {
  color: var(--sakura-hero-social-accent);
  background: oklch(from var(--sakura-hero-social-accent) l c h / 14%);
  border-color: oklch(from var(--sakura-hero-social-accent) l c h / 34%);
}

.sakura-hero-social-link:focus-visible {
  outline: 2px solid oklch(from var(--sakura-hero-social-accent) l c h / 70%);
  outline-offset: 2px;
}

.sakura-hero-social.is-revealed .sakura-hero-social-link {
  opacity: 1;
  transform: none;
}

.sakura-hero-social-icon {
  width: 18px;
  height: 18px;
}

.sakura-hero-side-nav {
  position: absolute;
  right: var(--sakura-hero-topbar-offset-x);
  top: 50%;
  transform: translateY(-50%);
  z-index: 12;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.sakura-hero-side-nav-entry {
  position: relative;
  height: 28px;
  width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  text-decoration: none;
  color: var(--sakura-color-background);
}

.sakura-hero-side-nav-entry:focus-visible {
  outline: 2px solid oklch(from var(--sakura-color-background) l c h / 70%);
  outline-offset: 3px;
}

.sakura-hero-side-nav-line {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--sakura-color-background);
  border-radius: 999px;
  transform-origin: right center;
}

.sakura-hero-side-nav-label {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  height: 28px;
  color: var(--sakura-color-background);
  font-size: 15px;
  line-height: 1;
  padding-right: 10px;
  white-space: nowrap;
  pointer-events: none;
}

.sakura-hero-overlay-bar {
  position: absolute;
  inset: 0;
}

.sakura-hero::after {
  content: '';
  position: absolute;
  inset: calc(var(--sakura-hero-frame-overlap) * -1) calc(var(--sakura-hero-frame-overlap) * -1)
    calc((var(--sakura-hero-frame-overlap) * -1) + var(--sakura-hero-bottom-push));
  pointer-events: none;
  z-index: 10;
  border-radius: calc(
      var(--sakura-hero-frame-radius-tl, var(--sakura-hero-frame-radius-default)) + var(--sakura-hero-frame-overlap)
    )
    calc(var(--sakura-hero-frame-radius-tr, var(--sakura-hero-frame-radius-default)) + var(--sakura-hero-frame-overlap))
    calc(var(--sakura-hero-frame-radius-br, var(--sakura-hero-frame-radius-default)) + var(--sakura-hero-frame-overlap))
    calc(var(--sakura-hero-frame-radius-bl, var(--sakura-hero-frame-radius-default)) + var(--sakura-hero-frame-overlap));
  box-sizing: border-box;
  border: var(--sakura-hero-frame-width) solid var(--sakura-hero-frame-color);
  border-bottom-width: var(--sakura-hero-frame-bottom-width);
}

.sakura-hero-toast {
  position: absolute;
  top: var(--sakura-hero-topbar-offset-y);
  left: 50%;
  transform: translateX(-50%);
  z-index: 13;
  padding: 10px 12px;
  border-radius: 999px;
  color: white;
  background: oklch(0% 0 0 / 65%);
  backdrop-filter: blur(8px);
  user-select: none;
}

.sakura-hero-brand {
  position: absolute;
  top: var(--sakura-hero-topbar-offset-y);
  left: var(--sakura-hero-topbar-offset-x);
  z-index: 12;
  pointer-events: auto;
}

.sakura-hero-brand-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding: 6px 10px;
  border-radius: 999px;
  background: transparent;
  border: none;
  text-decoration: none;
  color: var(--sakura-navbar-bg);
  white-space: nowrap;
}

.sakura-hero-brand-link:focus-visible {
  outline: 2px solid oklch(100% 0 0 / 85%);
  outline-offset: 2px;
}

.sakura-hero-brand-logo {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  flex: 0 0 34px;
}

.sakura-hero-brand-title {
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
}

.sakura-hero-top-right {
  position: absolute;
  top: var(--sakura-hero-topbar-offset-y);
  right: var(--sakura-hero-topbar-offset-x);
  z-index: 12;
  pointer-events: auto;
}

.sakura-hero-lang {
  position: relative;
}

.sakura-hero-lang-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 34px;
  padding: 6px 12px;
  border-radius: 999px;
  background: transparent;
  border: 1px solid oklch(100% 0 0 / 85%);
  color: oklch(100% 0 0 / 100%);
  cursor: pointer;
  user-select: none;
  line-height: 1;
  backdrop-filter: blur(10px);
}

.sakura-hero-lang-btn:hover {
  background: oklch(100% 0 0 / 10%);
}

.sakura-hero-lang-btn:focus-visible {
  outline: 2px solid oklch(100% 0 0 / 85%);
  outline-offset: 2px;
}

.sakura-hero-lang-btn-text {
  font-size: 14px;
  font-weight: 600;
}

.sakura-hero-lang-btn-caret {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.sakura-hero-lang-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 120px;
  padding: 6px;
  border-radius: 16px;
  background: oklch(0% 0 0 / 45%);
  border: 1px solid oklch(100% 0 0 / 35%);
  backdrop-filter: blur(12px);
  transform-origin: top right;
}

.sakura-hero-lang-menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  border-radius: 12px;
  background: transparent;
  border: none;
  color: oklch(100% 0 0 / 100%);
  cursor: pointer;
  text-align: left;
  line-height: 1;
}

.sakura-hero-lang-menu-item:hover {
  background: oklch(100% 0 0 / 10%);
}

.sakura-hero-lang-menu-item:focus-visible {
  outline: 2px solid oklch(100% 0 0 / 55%);
  outline-offset: 2px;
}

.sakura-hero-lang-menu-label {
  font-size: 14px;
  font-weight: 600;
}

.sakura-hero-lang-menu-check {
  font-size: 14px;
  opacity: 0.9;
}

.sakura-hero-toast-enter-active,
.sakura-hero-toast-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.sakura-hero-toast-enter-from,
.sakura-hero-toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-6px);
}

.sakura-hero-capsule {
  position: absolute;
  top: var(--sakura-hero-topbar-offset-y, calc(var(--sakura-hero-frame-width) + 24px));
  left: 50%;
  z-index: 12;
  max-width: min(880px, calc(100% - (var(--sakura-hero-frame-width) * 2) - 24px));
  transform: translateX(-50%);
}

.sakura-hero-brand,
.sakura-hero-top-right,
.sakura-hero-capsule,
.sakura-hero-deco-wrap {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.sakura-hero.is-playing {
  .sakura-hero-brand,
  .sakura-hero-top-right {
    opacity: 0;
    transform: translateY(-16px);
    pointer-events: none;
  }

  .sakura-hero-capsule {
    opacity: 0;
    transform: translate(-50%, -16px);
    pointer-events: none;
  }

  .sakura-hero-deco-wrap {
    opacity: 0;
    transform: translateY(24px);
    pointer-events: none;
  }

  .sakura-hero-carousel {
    opacity: 0;
    transform: translateY(24px);
    pointer-events: none;
  }
}

.sakura-hero-carousel.is-intro-hidden {
  opacity: 0;
}
</style>

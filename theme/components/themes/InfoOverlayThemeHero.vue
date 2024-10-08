<script setup lang="ts">
import { useSiteConfig } from 'valaxy'
import { useThemeConfig } from '../../composables'

const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()
</script>

<template>
  <div class="info-overlay-theme-hero max-w-screen-md px-6 2xl:max-w-7xl md:px-10">
    <p class="animation-fade-up" text="2xl md:5xl" style="animation-delay: 200ms;">
      <slot name="intro-text">
        {{ themeConfig.banner.title }}
      </slot>
    </p>

    <p class="animation-fade-up sakura-gradient-text" text="5xl md:8xl" font="black" style="animation-delay: 400ms;">
      <slot name="highlighted-text">
        I'm {{ siteConfig.author.name }}
      </slot>
    </p>

    <p class="animation-fade-up" text="2xl md:5xl" style="animation-delay: 600ms;">
      <slot name="subheading-text">
        <SakuraTypewriter
          :type-string="[
            `${siteConfig.description}`,
            `${siteConfig.author.status.message} ${siteConfig.author.status.emoji}`,
          ]" loop delete-all :pause-for="[3000, 4000]"
        />
      </slot>
    </p>

    <p class="animation-fade-up color-$sakura-c-text-muted" text="base md:2xl" style="animation-delay: 1000ms;">
      <slot name="muted-text">
        {{ themeConfig.banner.motto }}
      </slot>
    </p>
    <slot name="social">
      <ul class="animation-fade-up social grid gap-3" style="animation-delay: 1200ms;">
        <li
          v-for="s in siteConfig.social" :key="s.name" class="inline-flex border rounded-xl p-2 hover:bg-[hsl(0_0%_96.1%)]"
          dark="hover:bg-[hsl(0_0%_14.9%)]"
        >
          <a :style="{ '--sakura-c-icon': s.color }" :class="[s.icon]" class="icon" :href="s.link" aria-label="icon" target="_blank" />
        </li>
      </ul>
    </slot>
    <slot name="utils" />
  </div>
</template>

<style lang="scss">
.info-overlay-theme-hero {
  gap: 1.25rem;
  display: flex;
  flex-direction: column;

  p {
    letter-spacing: 0.1em;
  }

  .icon {
    height: 30px;
    width: 30px;
    color: var(--sakura-c-icon);
  }

  .social {
    grid-template-columns: repeat(auto-fill, 50px);
  }
}
</style>

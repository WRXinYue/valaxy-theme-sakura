<script setup lang="ts">
defineProps<{
  demo: number
}>()
</script>

<template>
  <div v-if="demo === 1" class="playground" h-100>
    <InfoOverlayThemeHero />
  </div>

  <div v-else-if="demo === 2" class="playground">
    <InfoOverlayThemeHero>
      <template #intro-text>
        <div />
      </template>
      <template #highlighted-text>
        This is custom text.
      </template>
      <template #subheading-text>
        <div />
      </template>
      <template #muted-text>
        <div />
      </template>
    </InfoOverlayThemeHero>
  </div>

  <div v-else-if="demo === 3" class="playground">
    <InfoOverlayThemeHero>
      <template #intro-text>
        <div />
      </template>
      <template #highlighted-text>
        <span text="2xl md:5xl">
          This is custom text.
        </span>
      </template>
      <template #subheading-text>
        <div />
      </template>
      <template #muted-text>
        <div />
      </template>
    </InfoOverlayThemeHero>
  </div>

  <div v-else-if="demo === 4" class="playground">
    <InfoOverlayThemeHero>
      <template #intro-text>
        <div />
      </template>
      <template #highlighted-text>
        <span text="2xl md:5xl">
          <SakuraTypewriter
            :type-string="['This is custom text.', 'Another example text.']"
            :delete-all="[100, 200]" loop :pause-for="[3000]"
          />
        </span>
      </template>
      <template #subheading-text>
        <div />
      </template>
      <template #muted-text>
        <div />
      </template>
      <template #social>
        <div />
      </template>
    </InfoOverlayThemeHero>
  </div>
</template>

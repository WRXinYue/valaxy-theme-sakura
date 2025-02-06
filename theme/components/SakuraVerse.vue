<script setup lang="ts">
import addonHitokoto from '../plugins/hitokoto'

const { hitokoto } = addonHitokoto?.useAddonHitokoto({ args: [addonHitokoto?.HitokotoType.Poetry] })
</script>

<template>
  <div class="poem-wrap">
    <div class="poem-border poem-left" />
    <div class="poem-border poem-right" />

    <h1>念两句诗</h1>
    <p class="poem-text">
      {{ hitokoto?.hitokoto }}
    </p>
    <p class="poem-info">
      {{ hitokoto?.fromWho }} 《{{ hitokoto?.from }}》
    </p>
  </div>
</template>

<style lang="scss" scoped>
.poem-wrap {
  position: relative;
  width: 730px;
  max-width: 80%;
  margin: 80px auto;
  border: 2px solid oklch(57.61% 0 0);
  border-top: none;
  text-align: center;

  h1 {
    top: -20px;
    display: inline-block;
    color: oklch(57.61% 0 0);
    font-weight: bold;
    font-size: 2em;
    letter-spacing: 4px;
  }

  .poem-text {
    width: 70%;
    margin: auto;
    line-height: 30px;
    color: oklch(57.61% 0 0);
  }

  .poem-info {
    font-size: 15px;
    margin: 15px auto;
    color: oklch(57.61% 0 0);
  }
}

.poem-border {
  position: absolute;
  height: 2px;
  width: 27%;
  background-color: oklch(57.61% 0 0);

  &.poem-left {
    left: 0;
  }

  &.poem-right {
    right: 0;
  }
}
</style>

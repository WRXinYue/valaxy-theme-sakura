<script setup lang="ts">
const props = defineProps(['class'])
</script>

<template>
  <template v-if="$slots.left && ($slots.default || $slots.content) && $slots.right">
    <div :class="props.class" class="grid-layout-triple-columns">
      <aside>
        <slot name="left" />
      </aside>
      <div>
        <template v-if="$slots.default">
          <slot />
        </template>
        <slot v-else name="content" />
      </div>
      <aside>
        <slot name="right" />
      </aside>
    </div>
  </template>
  <template v-if="$slots.left && ($slots.default || $slots.content) && !$slots.right">
    <div :class="props.class" class="grid-layout-two-columns-left">
      <aside>
        <slot name="left" />
      </aside>
      <div>
        <template v-if="$slots.default">
          <slot />
        </template>
        <slot v-else name="content" />
      </div>
    </div>
  </template>
  <template v-if="$slots.right && ($slots.default || $slots.content) && !$slots.left">
    <div :class="props.class" class="grid-layout-two-columns-right">
      <div>
        <template v-if="$slots.default">
          <slot />
        </template>
        <slot v-else name="content" />
      </div>
      <aside>
        <slot name="right" />
      </aside>
    </div>
  </template>
  <template v-if="($slots.default || $slots.content) && !$slots.left && !$slots.right">
    <div :class="props.class" class="grid-layout-one-columns">
      <div>
        <template v-if="$slots.default">
          <slot />
        </template>
        <slot v-else name="content" />
      </div>
    </div>
  </template>
</template>

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;

.grid-layout-triple-columns {
  grid-template-columns: 0 1fr 0;
  display: grid;
  grid-template-rows: 1fr;
  gap: 0 12px;

  @include screen('md') {
    grid-template-columns: 250px 1fr 250px;
  }
}

.grid-layout-two-columns-left {
  grid-template-columns: 0 1fr;
  display: grid;
  grid-template-rows: 1fr;
  gap: 0 12px;

  @include screen('md') {
    grid-template-columns: 330px 1fr;
  }
}

.grid-layout-two-columns-right {
  grid-template-columns: 1fr 0;
  display: grid;
  grid-template-rows: 1fr;
  gap: 0 12px;

  @include screen('md') {
    grid-template-columns: 1fr 330px;
  }
}

.grid-layout-one-columns {
  grid-template-columns: 1fr;
  display: grid;
  grid-template-rows: 1fr;
  gap: 0;

  @include screen('md') {
    grid-template-columns: 1fr;
  }
}
</style>

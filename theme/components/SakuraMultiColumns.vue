<script setup lang="ts">
const props = defineProps<{ class?: string, base?: boolean }>()
</script>

<template>
  <template v-if="$slots.left && ($slots.default || $slots.content) && $slots.right">
    <div class="sakura-triple-columns" :class="[{ 'sakura-triple-columns-base': base }, props.class]">
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
    <div class="sakura-two-columns-left" :class="[{ 'sakura-triple-columns-base': base }, props.class]">
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
    <div class="sakura-two-columns-right" :class="[{ 'sakura-triple-columns-base': base }, props.class]">
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
    <div class="sakura-one-columns" :class="[{ 'sakura-triple-columns-base': base }, props.class]">
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
.sakura-triple-columns-base {
  &.sakura-triple-columns {
    grid-template-columns: 0 1fr 0;
    display: grid;
    grid-template-rows: 1fr;
    gap: 0 12px;
  }

  &.sakura-two-columns-left {
    grid-template-columns: 0 1fr;
    display: grid;
    grid-template-rows: 1fr;
    gap: 0 12px;
  }

  &.sakura-two-columns-right {
    grid-template-columns: 1fr 0;
    display: grid;
    grid-template-rows: 1fr;
    gap: 0 12px;
  }

  &.sakura-one-columns {
    grid-template-columns: 1fr;
    display: grid;
    grid-template-rows: 1fr;
    gap: 0;
  }
}
</style>

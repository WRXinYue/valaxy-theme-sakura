<script setup lang="ts">
const props = defineProps(['class'])
</script>

<template>
  <template v-if="$slots.left && ($slots.default || $slots.content) && $slots.right">
    <div :class="props.class" class="sakura-triple-columns">
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
    <div :class="props.class" class="sakura-two-columns-left">
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
    <div :class="props.class" class="sakura-two-columns-right">
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
    <div :class="props.class" class="sakura-one-columns">
      <div>
        <template v-if="$slots.default">
          <slot />
        </template>
        <slot v-else name="content" />
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.sakura-triple-columns {
  grid-template-columns: 0 1fr 0;
  display: grid;
  grid-template-rows: 1fr;
  gap: 0 12px;
}

.sakura-two-columns-left {
  grid-template-columns: 0 1fr;
  display: grid;
  grid-template-rows: 1fr;
  gap: 0 12px;
}

.sakura-two-columns-right {
  grid-template-columns: 1fr 0;
  display: grid;
  grid-template-rows: 1fr;
  gap: 0 12px;
}

.sakura-one-columns {
  grid-template-columns: 1fr;
  display: grid;
  grid-template-rows: 1fr;
  gap: 0;
}
</style>

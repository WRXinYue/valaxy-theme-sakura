<script setup lang="ts">
const props = defineProps(['class'])
</script>

<template>
  <template v-if="$slots.left && ($slots.default || $slots.content) && $slots.right">
    <div :class="props.class" class="grid-layout-triple-columns container !max-w-screen-2xl lg:px-6 mx-auto pt-$header-height min-w-0">
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
    <div :class="props.class" class="grid-layout-two-columns-left container !max-w-screen-2xl lg:px-6 mx-auto pt-$header-height min-w-0">
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
    <div :class="props.class" class="grid-layout-two-columns-right container !max-w-screen-2xl lg:px-6 mx-auto pt-$header-height min-w-0">
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
</template>

<style lang="scss" scoped>
@use 'valaxy/client/styles/mixins/index.scss' as *;

.grid-layout-triple-columns {
  grid-template-columns: 0 1fr 0;
  display: grid;
  grid-template-rows: 1fr;
  gap: 0px 12px;

  @include screen('md') {
    grid-template-columns: 250px 1fr 250px;
  }
}

.grid-layout-two-columns-left {
  grid-template-columns: 0 1fr;
  display: grid;
  grid-template-rows: 1fr;
  gap: 0px 12px;

  @include screen('md') {
    grid-template-columns: 330px 1fr;
  }
}

.grid-layout-two-columns-right {
  grid-template-columns: 1fr 0;
  display: grid;
  grid-template-rows: 1fr;
  gap: 0px 12px;

  @include screen('md') {
    grid-template-columns: 1fr 330px;
  }
}
</style>

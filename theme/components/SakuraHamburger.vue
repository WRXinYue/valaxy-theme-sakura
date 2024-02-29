<script lang="ts" setup>
defineProps<{
  active?: boolean
}>()
</script>

<template>
  <button
    class="mobile_btn" :class="active ? 'mobile_btn-open' : ''" aria-label="mobile navigation" :aria-expanded="active"
  >
    <!-- TODO: Add more color configurations? -->
    <span :class="active ? 'bg-$st-c-brand' : 'bg-$st-c-accent'" />
    <span :class="active ? 'bg-$st-c-brand' : 'bg-$st-c-accent'" />
    <span :class="active ? 'bg-$st-c-brand' : 'bg-$st-c-accent'" />
  </button>
</template>

<style lang="scss" scoped>
.mobile_btn {
  width: 20px;
  height: 22px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  transition: transform 0.3s;

  span {
    position: relative;
    width: 100%;
    height: 5px;
    border-radius: 20px;
  }

  span:nth-child(1), span:nth-child(3) {
    width: 50%;
    align-self: flex-end;
    transform-origin: left;
    transition: transform 0.3s;
  }

  span:nth-child(1) {
    align-self: flex-start;
    transform-origin: right;
  }

}

.mobile_btn-open {
  transform: rotate(-45deg);
}

.mobile_btn-open span:nth-child(1), .mobile_btn-open span:nth-child(3) {
  transform: rotate(-90deg);
}
</style>

<script setup lang="ts">
defineProps<{
  active?: boolean
}>()
</script>

<template>
  <button class="mashiro-burger-menu" :class="active && 'mashiro-menu-on'">
    <div class="mashiro-burger" />
  </button>
</template>

<style lang="scss">
.mashiro-burger-menu {
  position: relative;
  width: 30px;
  height: 22px;
  cursor: pointer;
}

.mashiro-burger {
  position: absolute;
  background: rgba(111, 111, 111, 1);
  width: 100%;
  height: 4px;
  top: 50%;
  right: 0;
  margin-top: -5px;
  opacity: 1;
}

.mashiro-burger::before {
  position: absolute;
  background: rgba(111, 111, 111, 1);
  width: 100%;
  height: 4px;
  top: 8px;
  content: '';
  display: block;
}

.mashiro-burger::after {
  position: absolute;
  background: rgba(111, 111, 111, 1);
  width: 100%;
  height: 4px;
  bottom: 8px;
  content: '';
  display: block;
}

.mashiro-burger::after,
.mashiro-burger::before,
.mashiro-burger {
  transition: all 0.3s ease-in-out;
}

.mashiro-burger-menu.mashiro-menu-on .mashiro-burger::after {
  transform: rotate(-45deg);
  bottom: 0;
}

.mashiro-burger-menu.mashiro-menu-on .mashiro-burger::before {
  transform: rotate(45deg);
  top: 0;
}

.mashiro-burger-menu.mashiro-menu-on .mashiro-burger {
  background: rgba(111, 111, 111, 0);
}
</style>

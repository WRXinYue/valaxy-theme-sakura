<script lang="ts" setup>
import imacMockup from '../assets/images/mockuphone-imac.png'
import surfaceMockup from '../assets/images/mockuphone-surface.png'
</script>

<template>
  <div class="device-mockups <md:mr-40px">
    <img :src="imacMockup" class="imac-mockup" alt="iMac Mockup">
    <img :src="surfaceMockup" class="surface-mockup" alt="Surface Mockup">
  </div>
</template>

<style lang="scss">
.device-mockups {
    position: relative;
    width: fit-content;
    height: fit-content;
    margin-top: 80px;
}

.imac-mockup {
    display: block;
    width: 800px;
}

.surface-mockup {
    position: absolute;
    bottom: 45px;
    right: -40px;
    width: 40%;
}
</style>

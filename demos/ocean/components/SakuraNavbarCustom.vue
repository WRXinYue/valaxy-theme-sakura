<template>
  <SakuraNavbar :invert="true">
    <template #nav-brand>
      <SakuraSideBarToggleButton v-slot="{ active }" :persistence="true">
        <SakuraHamburger :active />
      </SakuraSideBarToggleButton>
    </template>
  </SakuraNavbar>
</template>

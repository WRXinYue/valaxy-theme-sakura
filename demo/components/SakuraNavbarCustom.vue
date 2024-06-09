<template>
  <SakuraNavbar :invert="true">
    <template #nav-tool>
      <div flex>
        <SakuraToggleLocale mr-2 />
        <SakuraToggleTheme />
      </div>
    </template>
  </SakuraNavbar>
</template>

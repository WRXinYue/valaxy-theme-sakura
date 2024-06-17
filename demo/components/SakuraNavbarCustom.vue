<template>
  <SakuraNavbar :invert="true" auto-hide>
    <template #nav-tool>
      <div flex>
        <SakuraToggleLocale mr-2 />
        <SakuraToggleTheme />
      </div>
    </template>
  </SakuraNavbar>
</template>

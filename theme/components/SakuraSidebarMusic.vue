<template>
  <SakuraSidebarCard class="sakura-sidebar-music" mt-4 icon="i-ri-music-2-line" title="Music">
    <MetingJs
      id="2489775340"
      server="netease"
      type="playlist"
      theme="var(--sakura-color-primary)"
      list-max-height="300px"
    />
  </SakuraSidebarCard>
</template>

<style lang="scss">
.sakura-sidebar-music {
  meting-js {
    width: 100%;

    .aplayer {
      box-shadow: none !important;

      &.aplayer-withlist {
        .aplayer-icon-menu {
          display: none !important;
        }
      }
    }
  }
}
</style>

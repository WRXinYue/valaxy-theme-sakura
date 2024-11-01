<template>
  <SakuraPostCardCustom>
    <template #content-extend>
      <div class="mashiro-dots-container absolute!">
        <MashiroDots />
      </div>
    </template>
  </SakuraPostCardCustom>
</template>

<style lang="scss">
.sakura-post-card {
  .mashiro-dots-container {
    bottom: var(--sakura-post-card-content-px);
  }

  &.flex-row-reverse {
    .mashiro-dots-container {
      left: var(--sakura-post-card-content-px);
    }
  }

  &:not(.flex-row-reverse) {
    .mashiro-dots-container {
      right: var(--sakura-post-card-content-px);
    }
  }

  // .sakura-post-card-content {
  //   colo
  // }

  .sakura-post-card-title {
    padding: 10px 0;
  }

  .sakura-post-card-meta {
    order: 2;
    padding-bottom: 10px;
  }
}
</style>

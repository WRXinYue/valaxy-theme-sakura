<template>
  <footer class="sakura-post-footer">
    <slot name="nav">
      <SakuraPostNav />
    </slot>

    <slot name="back">
      <div class="py-8">
        <RouterLink class="link" to="/">
          ← Back to the blog
        </RouterLink>
      </div>
    </slot>
  </footer>
</template>

<style lang="scss" scoped>
.sakura-post-footer {
  border-style: none;
}
</style>

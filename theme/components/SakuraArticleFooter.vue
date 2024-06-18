<template>
  <footer class="article-footer">
    <slot name="navigation">
      <ArticleNavigationThemeSakura />
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

<style lang="scss">
.article-footer {
  border-style: none;
}
</style>

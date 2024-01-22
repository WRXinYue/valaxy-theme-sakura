<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useFrontmatter, usePostList } from 'valaxy'

const frontmatter = useFrontmatter()

const route = useRoute()
const posts = usePostList()

function findCurrentIndex() {
  return posts.value.findIndex(p => p.path === route.path)
}

const nextPost = computed(() => posts.value[findCurrentIndex() - 1])
const prevPost = computed(() => posts.value[findCurrentIndex() + 1])
</script>

<template>
  <article>
    <header class="xl:pb-10 space-y-1 text-center">
      <div class="abanner h-45" :class="frontmatter.cover ? `bg-[url(${frontmatter.cover})]` : '<xl:max-h-200px'">
        <div class="titlebox font-bold" :class="frontmatter.cover && 'text-shadow-[2px_2px_10px_black]'">
          <h1 class="text-3xl" :class="!frontmatter.cover && 'text-[#404040] entry-title'">
            {{ frontmatter.title }}
          </h1>
          <div class="info text-base inline-flex" :class="!frontmatter.cover && 'text-[#888888]'">
            {{ frontmatter.author }} · 更新于 <SakuraDate :date="frontmatter.date" />
            <!-- {{ frontmatter.author }} · 更新于 <SakuraDate :date="frontmatter.date" /> · {{ frontmatter.view }} 次阅读 -->
          </div>
        </div>
      </div>

      <hr class="max-w-[50%] min-w-[40%] m-auto">
    </header>

    <div
      class="divide-y xl:divide-y-0  divide-gray-200 dark:divide-gray-700 pb-16 mx-8 md:mx-15 lg:mx-60 xl:mx-100"
      style="grid-template-rows: auto 1fr"
    >
      <StarterAuthor v-if="frontmatter.author" :frontmatter="frontmatter" />
      <div class="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
        <slot />
      </div>

      <footer class=" text-sm font-medium leading-5 divide-y divide-gray-200 dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
        <div v-if="nextPost && nextPost.path" class="py-8">
          <h2 class="text-xs tracking-wide uppercase text-gray-500">
            Next Article
          </h2>
          <div class="link">
            <RouterLink :to="nextPost.path">
              {{ nextPost.title }}
            </RouterLink>
          </div>
        </div>
        <div v-if="prevPost && prevPost.path" class="py-8">
          <h2 class="text-xs tracking-wide uppercase text-gray-500">
            Previous Article
          </h2>
          <div class="link">
            <RouterLink :to="prevPost.path">
              {{ prevPost.title }}
            </RouterLink>
          </div>
        </div>
        <div class="pt-8">
          <RouterLink class="link" to="/">
            ← Back to the blog
          </RouterLink>
        </div>
      </footer>
    </div>
  </article>
</template>

<style lang="scss">
.abanner {
  width: 100%;
  background-size: cover;
  background-position: center center;
  position: relative;

  .titlebox {
    position: absolute;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    bottom: 20px;
    color: white;
  }

}

.entry-title {
    &::before {
      content:" {";
      color:#f8ba0b;
      font-size:1.2em;
      margin-right:6px;
      font-family: 'Helvetica'
    }
    &::after {
      content:"}";
      color:#f8ba0b;
      font-size:1.2em;
      margin-left:6px;
      font-family: 'Helvetica'
    }
  }

.article {
  position: relative;
  max-width: 800px;
  margin: auto;

  .content {
    margin: 0.5em;
  }

  .nav {
    display: flex;
    justify-content: space-between;
  }
}

.content {
  color: var(--color-text);

  a {
    color: #e58700;
    position: relative;
    transition: color 0.2s ease-out;

    &.header-anchor {
      float: left;
      margin-top: 0.125em;
      margin-left: -0.87em;
      padding-right: 0.23em;
      font-size: 0.85em;
      opacity: 0;
    }

    &:hover {
      color: var(--color-accent);

      &:after {
        transform: scaleX(1);
        transform-origin: left;
      }
    }

    &:after {
      content: "";
      position: absolute;
      transform: scaleX(0);
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: var(--color-accent);
      transition: transform 0.2s ease-out;
      transform-origin: right;
    }
  }

  @for $i from 1 through 6 {
    h#{$i}:hover .header-anchor {
      opacity: 1;
    }
  }

  h2 {
    padding-bottom: 0.3em;
    margin-bottom: 1em;
    border-bottom: 1px dashed var(--color-border);
  }

  p {
    line-height: 1.5em;
  }

  li {
    margin-block-end: 0.3em;
  }
}

.katex-display {
  overflow: auto hidden;
}

.custom-block {

  &.tip,
  &.info,
  &.warning,
  &.danger {
    margin: 1rem 0;
    border-left: 0.5rem solid;
    padding: 0.1rem 1.5rem;
    overflow-x: auto;
  }

  &.tip {
    background-color: #f3f5f7;
    border-color: #3eaf7c;
  }

  &.info {
    background-color: #f3f5f7;
    border-color: #476582;
  }

  &.warning {
    border-color: #e7c000;
    color: #6b5900;
    background-color: #fff7d0;

    .custom-block-title {
      color: #b29400;
    }
  }

  &.danger {
    border-color: #c00;
    color: #4d0000;
    background-color: #ffe6e6;

    .custom-block-title {
      color: #900000;
    }
  }
}

.custom-block-title {
  font-weight: bold;
}

// inline code
code {
  font-size: var(--code-font-size);
  border-radius: 4px;
  padding: 0.2em 0.4em;
  background-color: rgba(27, 31, 35, 0.05);
}

html {
  --vp-icon-copy: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2'/%3E%3C/svg%3E");
  --vp-icon-copied: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4'/%3E%3C/svg%3E");
}

div[class*="language-"] {
  position: relative;
  line-height: var(--code-line-height);
  font-size: var(--code-font-size);
  font-family: var(--code-font-family);
  display: flex;
  flex-direction: row-reverse;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  padding-top: 32px;
  overflow: hidden;

  button.copy {
    position: absolute;
    top: 8px;
    right: 8px;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: white;
    background-image: var(--vp-icon-copy);
    background-repeat: no-repeat;
    background-position: 50%;
    border-radius: 4px;
    opacity: 0;
    border: 1px solid var(--color-border);
  }

  &:hover button.copy {
    opacity: 1;
  }

  .lang {
    position: absolute;
    transform: translate(-50%, -28px);
    left: 50%;
    user-select: none;
  }

  pre {
    margin: 0;
    margin-left: 16px;
    flex-grow: 1;
    overflow: scroll;
  }

  code {
    background-color: transparent;
    padding: 0;
  }

  &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 32px;
    background: #f6f8fa;
    border-bottom: 1px solid var(--color-border);
  }

  &:after {
    content: "";
    position: absolute;
    top: 10px;
    left: 12px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fc625d;
    box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
  }
}

.line-numbers-wrapper {
  padding-left: 16px;
  color: var(--color-gray);
  user-select: none;
}
</style>

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
    <SakuraPageHeader :title="frontmatter.title" :cover="frontmatter.cover" :author="frontmatter.author" :date="frontmatter.date" />

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

<style lang="scss" scoped>
// .article {
//   position: relative;
//   max-width: 800px;
//   margin: auto;

//   .content {
//     margin: 0.5em;
//   }

//   .nav {
//     display: flex;
//     justify-content: space-between;
//   }
// }

// .content {
//   color: var(--color-text);

//   a {
//     color: #e58700;
//     position: relative;
//     transition: color 0.2s ease-out;

//     &.header-anchor {
//       float: left;
//       margin-top: 0.125em;
//       margin-left: -0.87em;
//       padding-right: 0.23em;
//       font-size: 0.85em;
//       opacity: 0;
//     }

//     &:hover {
//       color: var(--color-accent);

//       &:after {
//         transform: scaleX(1);
//         transform-origin: left;
//       }
//     }

//     &:after {
//       content: "";
//       position: absolute;
//       transform: scaleX(0);
//       width: 100%;
//       height: 2px;
//       bottom: 0;
//       left: 0;
//       background-color: var(--color-accent);
//       transition: transform 0.2s ease-out;
//       transform-origin: right;
//     }
//   }

//   @for $i from 1 through 6 {
//     h#{$i}:hover .header-anchor {
//       opacity: 1;
//     }
//   }

//   h2 {
//     padding-bottom: 0.3em;
//     margin-bottom: 1em;
//     border-bottom: 1px dashed var(--color-border);
//   }

//   p {
//     line-height: 1.5em;
//   }

//   li {
//     margin-block-end: 0.3em;
//   }
// }

// .katex-display {
//   overflow: auto hidden;
// }

// .custom-block {

//   &.tip,
//   &.info,
//   &.warning,
//   &.danger {
//     margin: 1rem 0;
//     border-left: 0.5rem solid;
//     padding: 0.1rem 1.5rem;
//     overflow-x: auto;
//   }

//   &.tip {
//     background-color: #f3f5f7;
//     border-color: #3eaf7c;
//   }

//   &.info {
//     background-color: #f3f5f7;
//     border-color: #476582;
//   }

//   &.warning {
//     border-color: #e7c000;
//     color: #6b5900;
//     background-color: #fff7d0;

//     .custom-block-title {
//       color: #b29400;
//     }
//   }

//   &.danger {
//     border-color: #c00;
//     color: #4d0000;
//     background-color: #ffe6e6;

//     .custom-block-title {
//       color: #900000;
//     }
//   }
// }

// .custom-block-title {
//   font-weight: bold;
// }
</style>

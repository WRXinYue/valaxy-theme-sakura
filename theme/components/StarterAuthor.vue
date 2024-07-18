<script setup lang="ts">
import type { Post } from 'valaxy'

defineProps<{
  frontmatter: Post
}>()
</script>

<template>
  <dl class="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11">
    <dt class="sr-only">
      Authors
    </dt>
    <dd>
      <ul
        class="flex justify-center xl:block space-x-8 sm:space-x-12 xl:space-x-0 xl:space-y-8"
      >
        <li class="flex items-center space-x-2">
          <img
            v-if="frontmatter.gravatar"
            :src="`https://gravatar.com/avatar/${frontmatter.gravatar}`"
            alt="author image"
            class="h-10 w-10 rounded-full"
          >
          <dl class="whitespace-nowrap text-sm font-medium leading-5">
            <dt class="sr-only">
              Name
            </dt>
            <dd class="st-text">
              {{ frontmatter.author }}
            </dd>
            <dt v-if="frontmatter.twitter" class="sr-only">
              Twitter
            </dt>
            <dd v-if="frontmatter.twitter">
              <a
                :href="`https://twitter.com/${frontmatter.twitter}`"
                target="_blank"
                rel="noopnener noreferrer"
                class="link"
              >{{ frontmatter.twitter }}</a>
            </dd>
          </dl>
        </li>
      </ul>
    </dd>
  </dl>
</template>

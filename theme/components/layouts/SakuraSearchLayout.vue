<script lang="ts" setup>
import { useFuseSearch } from 'valaxy'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { isClient } from '@vueuse/core'

const input = ref()

const { results, fetchFuseListData } = useFuseSearch(input)
const route = useRoute()

watch(() => route.query.q as string, (query) => {
  if (isClient)
    fetchFuseListData()

  input.value = query || ''
}, { immediate: true })
</script>

<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component">
      <template #main-content>
        <slot name="content">
          <div class="sakura-search mt-20">
            <header class="page-header">
              <h1 class="page-title">
                <template v-if="results.length > 0">
                  搜索结果: {{ input }}
                </template>
                <template v-else>
                  没有找到任何东西！
                </template>
              </h1>
            </header>
            <div v-if="results.length > 0" overflow="auto" flex="~" w="full">
              <div class="sakura-search-result post post-list" flex="~ col" w="full">
                <div v-for="result in results" :key="result.item.title" class="post-entry" flex="~">
                  <AppLink :to="result.item.link">
                    <div class="feature">
                      <div class="flex-center overlay">
                        <div i-fa-file-text-o />
                      </div>
                      <SakuraImageCard :src="result.item?.cover" class="h-full rounded-full" />
                    </div>
                  </AppLink>
                  <div class="ml-9 flex-grow">
                    <div flex="~" class="items-center justify-between">
                      <h3 class="sakura-search-result-title entry-title">
                        <AppLink :to="result.item.link">
                          {{ result.item.title }}
                        </AppLink>
                      </h3>

                      <div class="p-time flex items-center">
                        <span i-mdi-access-time class="mr-1 inline-flex" />
                        发布于 {{ result.item.date }}
                      </div>
                    </div>

                    <p class="sakura-search-result-excerpt">
                      {{ result.item.excerpt }}
                    </p>

                    <div class="post-more">
                      <AppLink :to="result.item.link">
                        <SakuraDots class="float-right mt-10px" />
                      </AppLink>
                    </div>
                    <hr w="1/3" class="mx-auto mb-62px mt-69px" border="~ $sakura-color-divider">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </slot>
      </template>
    </component>
  </RouterView>
</template>

<style lang="scss" scoped>
.sakura-search {
  padding-top: 4rem;
  margin-top: var(--sakura-navbar-height);
  margin-right: auto;
  margin-left: auto;
  pointer-events: auto;
  transition: color 0.2s ease;
  width: 90%;
  max-width: 800px;

  &-input {
    background: transparent;
    color: var(--sakura-color-text);
    font-size: 1.5rem;
    border-radius: 3rem;
    padding: 1rem 1.5rem;
    border: 1px solid var(--sakura-color-border);
    box-sizing: border-box;
    font-weight: 900;
    text-align: center;
    transition: all 0.2s;

    &:focus {
      border-color: var(--sakura-color-primary);
    }
  }

  &-result-item {
    color: var(--sakura-color-text);
    cursor: pointer;

    &:hover {
      color: var(--sakura-color-primary);
    }
  }

  .page-header {
    position: relative;
    text-align: center;
    margin-bottom: 50px;

    .page-title {
      font-size: 20px;
      font-weight: 400;
      border: 1px dashed var(--sakura-color-divider);
      padding: 10px 15px;
      color: var(--sakura-color-text);
      margin-bottom: 30px;
    }
  }

  .entry-title {
    a {
      color: var(--sakura-color-text-deep);
      font-size: 20px;
      font-weight: 400;
      line-height: 50px;
      font-family: 'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif',
        source-han-serif-sc, 'PT Serif', 'SongTi SC', 'MicroSoft Yahei',
        Georgia, serif;

      &:hover {
        color: var(--sakura-color-primary);
      }
    }
  }

  .sakura-search-result-excerpt {
    font-size: 15px;
    color: var(--sakura-color-text);
    letter-spacing: 0;
    line-height: 30px;
  }

  .p-time {
    font-size: 12px;
    color: var(--sakura-color-text);
    letter-spacing: 0;
  }

  .post-more {
    font-size: 25px;
    color: var(--sakura-color-text);
  }

  .feature {
    border-radius: 50%;
    padding: 2px;
    position: relative;
    border: 1px solid var(--sakura-color-divider);
    height: 100px;
    width: 100px;
    overflow: hidden;
  }

  .overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background-color: orange;
    opacity: 0;
    transition: opacity 0.3s ease-out;
    pointer-events: none;

    div {
      font-size: 25px;
      color: oklch(100% 0 0);
      line-height: 94px;
    }
  }

  .feature:hover .overlay {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>

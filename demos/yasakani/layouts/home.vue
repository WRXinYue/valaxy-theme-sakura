<script lang="ts" setup>
import { useSiteConfig } from 'valaxy'

const siteConfig = useSiteConfig()
</script>

<template>
  <Layout>
    <SakuraHomeLayout>
      <template #right>
        <SakuraCard>
          <template #content>
            <div class="flex flex-col items-center my-5">
              <div class="site-author-avatar">
                <img class="rounded-full" :src="siteConfig.author.avatar" alt="avatar">
              </div>
              <h2 class="site-author-name text-xl font-medium">
                WRXinYue
              </h2>
              <span class="site-subtitle">这是我的博客网站</span>
              <span class="site-description" />
              <div class="content-container grid grid-cols-3 gap-x-8">
                <div class="article">
                  <span class="content-text">文章</span><br>
                  <span class="content-number">23</span>
                </div>
                <div class="label">
                  <span class="content-text">标签</span><br>
                  <span class="content-number">44</span>
                </div>
                <div class="category">
                  <span class="content-text">分类</span><br>
                  <span class="content-number">15</span>
                </div>
              </div>
            </div>
          </template>
        </SakuraCard>
      </template>
    </SakuraHomeLayout>
  </Layout>
</template>

<style lang="scss" scoped>
.content-container {
  text-align: center;
  margin-top: 14px;
}
.content-text {
  font-size: 1rem;
  line-height: 1.5rem;
}
.content-number {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
</style>

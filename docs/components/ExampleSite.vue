<script lang="ts" setup>
export interface ExampleSite {
  /**
   * 站点名称
   */
  name: string
  /**
   * 站点链接
   */
  url: string
  /**
   * 头像/LOGO
   */
  avatar: string
  /**
   * 简要描述
   */
  desc: string
  /**
   * 主题
   */
  theme: string
}

withDefaults(
  defineProps<{
    site: ExampleSite
  }>(),
  {
    site: () => ({
      name: '云游君的小站',
      url: 'https://www.yunyoujun.cn',
      avatar: 'https://www.yunyoujun.cn/images/avatar.jpg',
      desc: '希望能成为一个有趣的人',
      theme: 'yun',
    }),
  },
)
</script>

<template>
  <a
    class="rounded p-4 shadow flex! flex-col! items-center! justify-center! decoration-none! hover:shadow-md transition!"
    :href="site.url" target="_blank"
  >
    <img class="h-15 w-15 flex rounded rounded-full shadow" :src="site.avatar">
    <sub m="t-3" class="block w-20 truncate whitespace-nowrap" text="xs center" :title="site.desc">
      {{ site.name }}
    </sub>
  </a>
</template>

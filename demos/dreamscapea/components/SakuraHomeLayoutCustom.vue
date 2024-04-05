<template>
  <SakuraBannerCustom />

  <SakuraMultiColumnsLayout>
    <template #content>
      <slot name="article-pinned">
        <SakuraArticlePinnedCustom />
      </slot>

      <slot name="article-list">
        <SakuraArticleListCustom />
      </slot>

      <SakuraPaginationCustom />

      <slot name="content" />
    </template>
    <template #right>
      <SakuraCard>
        <template #content>
          正在制作
        </template>
      </SakuraCard>
    </template>
  </SakuraMultiColumnsLayout>
</template>

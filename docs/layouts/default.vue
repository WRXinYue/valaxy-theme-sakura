<template>
  <Layout>
    <OceanusArticle>
      <RouterView v-slot="{ Component }">
        <component :is="Component">
          <template #main-nav-before>
            <GitLogContributor />
          </template>
          <template #main-nav>
            <OceanusArticleNav />
          </template>
        </component>
      </RouterView>
    </OceanusArticle>
  </Layout>
</template>

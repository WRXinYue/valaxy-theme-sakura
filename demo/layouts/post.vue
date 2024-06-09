<template>
  <Layout>
    <PostThemeSakura>
      <template #right>
        <SakuraAsideLayout>
          Interactive graph
          <SakuraNetworkGraph :height="300" :width="300" />
          <SakuraToc />
        </SakuraAsideLayout>
      </template>
    </PostThemeSakura>
  </Layout>
</template>

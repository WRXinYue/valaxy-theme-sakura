<template>
  <Layout>
    <SakuraMultiColumnsLayout class="sidebar">
      <template #left>
        <SakuraAsideLayout>
          <!-- <SakuraSiteInfoCard /> -->
          <!-- <SakuraSocialLinks /> -->
          <SakuraSidebarCustom />
        </SakuraAsideLayout>
      </template>
      <template #content>
        <SakuraNetworkGraph />
        <RouterView />
      </template>
      <template #right>
        <SakuraAsideLayout>
          <SakuraSiteInfoCard />
        </SakuraAsideLayout>
      </template>
    </SakuraMultiColumnsLayout>
  </Layout>
</template>

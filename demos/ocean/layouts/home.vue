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
        <SakuraHomeLayout>
          <template #content>
            <RouterView />
          </template>
        </SakuraHomeLayout>
      </template>
      <template #right>
        <SakuraAsideLayout>
          <SakuraSiteInfoCard />
          <SakuraNetworkGraph />
        </SakuraAsideLayout>
      </template>
    </SakuraMultiColumnsLayout>
  </Layout>
</template>

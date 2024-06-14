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
        <SakuraHomeLayout />
      </template>
      <template #right>
        <SakuraAsideLayout>
          <SakuraSiteInfoCard />
          <SakuraNetworkGraph :width="300" :height="300" />
        </SakuraAsideLayout>
      </template>
    </SakuraMultiColumnsLayout>
  </Layout>
</template>

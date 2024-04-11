<template>
  <Layout>
    <SakuraMultiColumnsLayout>
      <template #content>
        <div class="content mt-$st-c-navbar-height">
          <RouterView />
        </div>
      </template>
      <template #right>
        <SakuraAside />
      </template>
    </SakuraMultiColumnsLayout>
  </Layout>
</template>

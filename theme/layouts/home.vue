<template>
  <Layout>
    <div class="divide-y divide-gray-200 dark:divide-gray-700">
      <SakuraHeader />
      <SakuraToTop />
      <slot>
        <RouterView />
      </slot>
    </div>
  </Layout>
</template>

<template>
  <Layout>
    <div class="divide-y divide-gray-200 dark:divide-gray-700">
      <StarterHeader />

      <Sidebar />
      <slot>
        <RouterView />
      </slot>
    </div>
  </Layout>
</template>

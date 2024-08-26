<template>
  <SakuraPostLayout>
    <template #right>
      <SakuraAsideLayout>
        Interactive graph
        <SakuraNetworkGraph :height="300" :width="300" />
        <SakuraToc />
      </SakuraAsideLayout>
    </template>
  </SakuraPostLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useSakuraAppStore } from '../stores'

const sakuraApp = useSakuraAppStore()

// 控制面板的显示/隐藏状态
const isPanelVisible = ref(false)

// 切换面板显示/隐藏
function togglePanel() {
  isPanelVisible.value = !isPanelVisible.value
}
</script>

<template>
  <div>
    <!-- 切换按钮 -->
    <div
      class="fixed bottom-8 right-8 z-20 h-14 w-14 flex cursor-pointer items-center justify-center rounded-full from-blue-500 to-teal-400 bg-gradient-to-r shadow-lg transition-all duration-200 ease-in-out active:scale-95 hover:scale-110"
      @click="togglePanel"
    >
      <!-- 可以在这里放一个图标，例如切换面板的图标 -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v18m9-9H3" />
      </svg>
    </div>

    <!-- 控制面板 -->
    <Transition>
      <div v-show="isPanelVisible" class="fixed right-0 top-$sakura-navbar-height z-100 h-full w-64 bg-white p-4 shadow-xl">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-semibold">
            控制面板
          </h2>
          <button class="text-gray-600 hover:text-gray-900" @click="togglePanel">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="space-y-4">
          <p>文章布局</p>
          <!-- 其他控制面板内容 -->
          <div flex="~">
            <button class="w-full rounded-lg bg-blue-500 p-2 text-white" @click="sakuraApp.themePostList = 'card'">
              <div i-ri-layout-horizontal-line />
            </button>
            <button class="w-full rounded-lg bg-blue-500 p-2 text-white" @click="sakuraApp.themePostList = 'grid'">
              <div i-ri-grid-fill />
            </button>
            <button class="w-full rounded-lg bg-blue-500 p-2 text-white" @click="sakuraApp.themePostList = 'masonry'">
              <div i-ri-layout-masonry-line />
            </button>
          </div>
        </div>
        <div class="space-y-4">
          <p>右侧边栏</p>
          <!-- 其他控制面板内容 -->
          <div flex="~">
            <button class="w-full rounded-lg bg-blue-500 p-2 text-white" @click="sakuraApp.themePostList = 'card'">
              <div i-ri-layout-horizontal-line />
            </button>
            <button class="w-full rounded-lg bg-blue-500 p-2 text-white" @click="sakuraApp.themePostList = 'grid'">
              <div i-ri-grid-fill />
            </button>
            <button class="w-full rounded-lg bg-blue-500 p-2 text-white" @click="sakuraApp.themePostList = 'masonry'">
              <div i-ri-layout-masonry-line />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.v-enter-to,
.v-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>

import { capitalize, defineAsyncComponent, ref } from 'vue'

const modules = {
  MashiroPostCard: import('@valaxy-theme-sakura/mashiro/components/MashiroPostCard.vue'),

  SakuraPostCard: import('valaxy-theme-sakura/components/SakuraPostCard.vue'),
}

export const themes = ref<'sakura' | 'mashiro'>('mashiro')

export function loadThemeComponent(component: string) {
  const Component = defineAsyncComponent({
    loader: () => modules[`${capitalize(themes.value)}${component}`],
    errorComponent: modules[`Sakura${component}`],
  })
  return Component
}

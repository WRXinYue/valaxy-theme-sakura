import type { Component } from 'vue'
import { capitalize, defineAsyncComponent } from 'vue'
import { sakurairoModules } from '@valaxy-theme-sakura/sakurairo/components'
import { mashiroModules } from '@valaxy-theme-sakura/mashiro/components'
import { useSakuraAppStore } from '../stores'

const sakuraModules = import.meta.glob<Record<string, Promise<Component>>>('valaxy-theme-sakura/components/*.vue')
const modules: Record<string, () => Promise<Component>> = { ...sakurairoModules, ...mashiroModules }

const defaultComponents = Object.keys(sakuraModules).reduce((acc, key) => {
  const componentName = key.match(/Sakura(\w+)\.vue$/i)?.[1]
  if (componentName) {
    acc[componentName] = sakuraModules[key]
  }
  return acc
}, {} as Record<string, () => Promise<Component>>)

export function useComponent() {
  const sakura = useSakuraAppStore()

  function loadThemeComponent(component: string) {
    const componentKey = `${capitalize(sakura.curTheme)}${component}`
    const defaultComponent = defaultComponents[component]
    const loaderComponent = sakura.curTheme === 'sakura'
      ? defaultComponent
      : modules[`./${componentKey}.vue`] || defaultComponent

    // console.log('loaderComponent', loaderComponent)

    return defineAsyncComponent({
      loader: loaderComponent,
      errorComponent: defaultComponents[component],
    })
  }

  return {
    loader: loadThemeComponent,
  }
}

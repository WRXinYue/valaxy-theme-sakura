import type { ComponentResolver } from 'unplugin-vue-components'
import type { ThemeConfig } from '../types'

export interface ComponentInfo {
  path: string
  theme: string
}

const components: { [key: string]: ComponentInfo } = {}

// Helper function to format the component name
function formatComponentName(name: string) {
  return name[0].toUpperCase() + name.slice(1)
}

export function SakuraStyleResolver(options: ThemeConfig): ComponentResolver {
  const { theming } = options

  return {
    type: 'component',
    resolve: (name: string) => {
      if (theming) {
        const componentName = formatComponentName(name)

        // console.log('componentName', componentName)

        // Check for existing component path
        const component = components[componentName]
        if (component) {
          const { path } = component
          return {
            from: `@valaxy-theme-sakura/${theming}/components/${path}`,
          }
        }

        // console.log('name', name)

        if (name.toLowerCase().startsWith(theming.toLowerCase())) {
          // console.log(`@valaxy-theme-sakura/${theming}/components/${componentName}.vue`)
          return {
            from: `@valaxy-theme-sakura/${theming}/components/${componentName}.vue`,
          }
        }

        // console.log('name.toLowerCase()', name.toLowerCase())
        if (name.toLowerCase().endsWith('custom')) {
          const trimmedName = componentName.slice(0, -6)
          return {
            from: `valaxy-theme-sakura/components/${trimmedName}.vue`,
          }
        }
      }
    },
  }
}

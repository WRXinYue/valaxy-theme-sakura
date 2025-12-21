import type { Component } from 'vue'

export type SidebarComponent = string | Component

export interface SakuraLayoutSidebarItem {
  /**
   * Component name or component object
   */
  component: SidebarComponent
  /**
   * Props to pass to the component
   */
  props?: Record<string, any>
  /**
   * Whether to enable this component
   * @default true
   */
  enable?: boolean
}

export interface SakuraLayoutOptions {
  /**
   * Page layout mode
   * @default 'triple-columns'
   */
  layout?: 'triple-columns' | 'two-columns-right' | 'two-columns-left' | 'one-column'

  sidebar?: {
    /**
     * Components to display in the left sidebar
     */
    left?: (SidebarComponent | SakuraLayoutSidebarItem)[]
    /**
     * Components to display in the right sidebar
     */
    right?: (SidebarComponent | SakuraLayoutSidebarItem)[]
  }
}

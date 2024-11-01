export interface Footer {
  /**
   * 建站于
   */
  since?: number

  /**
   * Icon between year and copyright info.
   */
  icon?: {
    /**
     * icon name, i-xxx
     */
    enable?: boolean
    name?: string
    img?: string
    animated?: boolean
    url?: string
    title?: string
  }

  /**
   * Powered by valaxy & valaxy-theme-${name}, default is yun
   */
  powered?: boolean

  /** 备案 ICP */
  icp?: string
}

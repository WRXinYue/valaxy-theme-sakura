import type { SocialLink } from 'valaxy'
import type { HitokotoOptions } from 'valaxy-addon-hitokoto'

export interface Hero {
  title: string
  motto: string
  urls: string[] | string
  /**
   * @zh 是否随机 urls，开启此项切换 url 也会进行随机
   * @default false
   */
  randomUrls: boolean
  fixedImg: boolean
  style: 'filter-dot' | 'filter-dim' | 'filter-grid' | ''
  mode: 'dim' | 'dot' | 'scanline'

  /**
   * @zh 是否启用打字机组件
   * @en Whether to enable the typewriter component
   * @default false
   */
  typewriter?: boolean
  /**
   * @zh 启用一言，如果启用则 `motto` 显示为一言
   * @en Enable Hitokoto, if enabled, `motto` will display as Hitokoto
   * @default false
   */
  enableHitokoto?: boolean
  /**
   * @zh 一言的配置选项
   * @en Hitokoto configuration options
   */
  hitokoto?: HitokotoOptions
  /**
   * @zh 背景波纹主题
   * @en Background wave theme
   * @default undefined
   */
  waveTheme?: 'fish' | 'horizontal' | 'ripple' | 'yunCloud'
  /**
   * @zh 自定义视频, 可以放PV MV之类的
   * @en Custom Video
   */
  playerUrl?: string
  /**
   * @zh 是否禁用画中画功能
   * @en Whether to disable picture-in-picture feature
   * @default undefined
   */
  disablePictureInPicture?: boolean
  socials: Partial<HeroSocialLink[]>

  socialStyle: 'merge' | 'separate' | 'single'
}

export interface HeroSocialLink extends Partial<SocialLink> {
  img?: string
}

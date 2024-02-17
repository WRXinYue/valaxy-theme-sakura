import { isClient, useScriptTag } from '@vueuse/core'
import type { ComputedRef } from 'vue'
import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import type { Live2dOptions } from '../types'
import { useAddonLive2d } from './options'

export function useAutoLoad(options: ComputedRef<Live2dOptions | undefined>) {
  function initAutoLoad(live2dOptions: Live2dOptions) {
    if (!isClient)
      return

    const defaultOptions = {
      live2dPath: 'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/',
      waifuPath: 'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/waifu-tips.json',
      apiPath: 'https://live2d.fghrsh.net/api/',
      cdnPath: 'https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/',
    }

    const newLive2dOptions = Object.assign(defaultOptions, live2dOptions)

    useHead({
      link: [
        {
          rel: 'stylesheet',
          href: `${newLive2dOptions.live2dPath}waifu.css`,
        },
      ],
    })

    useScriptTag(`${newLive2dOptions.live2dPath}live2d.min.js`, () => {
      useScriptTag(`${newLive2dOptions.live2dPath}waifu-tips.js`, () => {
        initWidget({
          waifuPath: newLive2dOptions.waifuPath,
          apiPath: newLive2dOptions.apiPath,
          // cdnPath: 'https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/',
        })
      })
    })
  }
  if (options.value)
    initAutoLoad(options.value)
}

export function useAutoLoadWithOptions() {
  const addonLive2d = useAddonLive2d()
  const options = computed(() => addonLive2d.value.options)
  useAutoLoad(options)
}

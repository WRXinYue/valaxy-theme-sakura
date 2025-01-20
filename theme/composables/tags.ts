import { TinyColor } from '@ctrl/tinycolor'
import { useTags } from 'valaxy'
import { useThemeConfig } from './config'

/**
 * get utils about tags
 */
export function useSakuraTags(options: {
  rainbow: string[]
} = {
  rainbow: [
    '#ff4e6a',
    '#ff761e',
    '#ffb900',
    '#33d57a',
    '#00dbff',
    '#1a98ff',
    '#9090ff',
  ],
}) {
  const themeConfig = useThemeConfig()
  const tags = useTags()

  const getTagStyleByIndex = (index: number) => {
    const rainbow = themeConfig.value.tags?.rainbow === true
      ? options.rainbow
      : Array.isArray(themeConfig.value.tags?.rainbow)
        ? themeConfig.value.tags.rainbow
        : false

    if (!rainbow)
      return

    const colorIndex = index % rainbow.length
    const baseColor = new TinyColor(rainbow[colorIndex])

    const textColor = baseColor.toString()
    const backgroundColor = baseColor.setAlpha(0.15).toString()

    return {
      '--sakura-tag-color': textColor,
      '--sakura-tag-bg': backgroundColor,
    }
  }

  const getTagStyleByCount = (count: number) => {
    const gray = new TinyColor('#999999')
    const primaryColor = new TinyColor(themeConfig.value.colors.primary)

    const counts = Array.from(tags.value).map(([_, value]) => value.count)
    const max = Math.max(...counts)
    const min = Math.min(...counts)
    const range = max - min
    const percent = (count - min) / range
    return {
      '--sakura-tag-color': gray.mix(primaryColor, percent * 100).toString(),
      'fontSize': `${percent * 36 + 12}px`,
    }
  }

  return {
    tags,
    getTagStyle: getTagStyleByIndex,
    getTagStyleByIndex,
    getTagStyleByCount,
  }
}

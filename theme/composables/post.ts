import { useSiteConfig, usePostList as useValaxyPostList } from 'valaxy'
import { computed } from 'vue'
import { useThemeConfig } from '../composables'
import { useSakuraAppStore } from '../stores'
import { resolveImage } from '../utils'

// import type { ComputedRef, StyleValue } from 'vue'
// import { computed } from 'vue'
// import { useThemeConfig } from './config'

// /**
//  * get type card property
//  * todo: test reactive
//  */
// export function usePostProperty(type?: string): {
//   color: string
//   icon: string
//   styles: StyleValue | undefined | ComputedRef<StyleValue | undefined>
// } {
//   if (!type) {
//     return {
//       color: '',
//       icon: '',
//       styles: undefined,
//     }
//   }

//   const themeConfig = useThemeConfig()

//   if (!(type in themeConfig.value.types))
//     type = 'link'

//   const color = themeConfig.value.types[type].color
//   const icon = themeConfig.value.types[type].icon

//   const styles = computed<StyleValue | undefined>(() => {
//     return type
//       ? ({
//           '--card-c-primary': color,
//         })
//       : undefined
//   })

//   return {
//     color,
//     icon,
//     styles,
//   }
// }

export function usePostList(params: {
  type?: string
} = {}) {
  const siteConfig = useSiteConfig()
  const themeConfig = useThemeConfig()
  const sakura = useSakuraAppStore()
  const pageSize = computed(() => themeConfig.value.pagination?.itemsPerPage || siteConfig.value.pageSize)

  const posts = useValaxyPostList(params)
  const curPage = computed(() => sakura.curPage || 1)

  const displayedPosts = computed(() =>
    posts.value.slice(
      (curPage.value - 1) * pageSize.value,
      curPage.value * pageSize.value * sakura.loadMultiple,
    ),
  )

  const postsWithLimitedTags = computed(() => {
    return displayedPosts.value.map((post) => {
      if (themeConfig.value.postList?.defaultImage)
        post.cover = post.cover || resolveImage(themeConfig.value.postList.defaultImage)

      if (post.tags && post.tags.length > 3)
        return { ...post, tags: post.tags.slice(0, 3) }

      return post
    })
  })

  return postsWithLimitedTags
}

<script lang="ts" setup>
import { nextTick } from 'vue'
import type { PageData, Post } from 'valaxy'

// import { onContentUpdated, useSiteConfig } from 'valaxy'
// import { useRoute, useRouter } from 'vue-router'
import { useSiteConfig } from 'valaxy'
import { useRoute } from 'vue-router'
import { scrollTo } from '../../utils'

defineProps<{
  frontmatter: Post
  data?: PageData
}>()
const siteConfig = useSiteConfig()

const route = useRoute()
// const router = useRouter()

nextTick(() => {
  if (route.hash) {
    setTimeout(() => {
      scrollTo(document.body, route.hash, true)
    }, 0)
  }
})

// onContentUpdated(() => {
//   // to extract
//   // click title scroll
//   window.addEventListener(
//     'click',
//     async (e) => {
//       const link = (e.target as Element).closest('a')
//       if (link) {
//         const { protocol, hostname, pathname, hash, target } = link
//         const currentUrl = window.location
//         const extMatch = pathname.match(/\.\w+$/)
//         // only intercept inbound links
//         if (
//           !e.ctrlKey
//           && !e.shiftKey
//           && !e.altKey
//           && !e.metaKey
//           && target !== '_blank'
//           && protocol === currentUrl.protocol
//           && hostname === currentUrl.hostname
//           && !(extMatch && extMatch[0] !== '.html')
//         ) {
//           if (pathname === currentUrl.pathname) {
//             e.preventDefault()
//             // scroll between hash anchors in the same page
//             if (hash && hash !== currentUrl.hash) {
//               await router.push({ hash: decodeURIComponent(hash) })

//               // use smooth scroll when clicking on header anchor links
//               scrollTo(link, hash, link.classList.contains('header-anchor'))
//             }
//           }
//         }
//       }
//     },
//     { capture: true },
//   )
// })
</script>

<template>
  <slot name="main">
    <div class="content">
      <slot name="main-header" />
      <slot name="main-header-after" />

      <slot name="main-content">
        <div class="markdown-body prose max-w-none pb-8">
          <ValaxyMd :frontmatter="frontmatter">
            <slot name="main-content-md" />
            <slot />
          </ValaxyMd>
        </div>
        <slot name="main-content-after" />
      </slot>
    </div>

    <slot name="main-nav-before" />

    <slot name="main-nav" />

    <slot name="main-nav-after" />

    <slot v-if="siteConfig.comment.enable && frontmatter.comment !== false" name="comment">
      <YunComment :class="frontmatter.nav === false ? 'mt-4' : 0" />
    </slot>

    <!-- <slot name="aside">
      <SakuraAside v-if="aside">
        <slot name="aside-custom" />
      </SakuraAside>
    </slot> -->

    <slot name="footer" />
  </slot>
</template>

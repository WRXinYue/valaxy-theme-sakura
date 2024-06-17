<script lang="ts" setup>
import { nextTick } from 'vue'
import type { PageData, Post } from 'valaxy'

// import { onContentUpdated, useSiteConfig } from 'valaxy'
// import { useRoute, useRouter } from 'vue-router'
import { scrollTo, useSiteConfig } from 'valaxy'
import { useRoute } from 'vue-router'

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
      scrollTo(document.body, route.hash)
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
    <slot name="main-header" />
    <slot name="main-header-after" />

    <slot name="main-content">
      <Transition appear>
        <ValaxyMd class="max-w-none min-w-0" :frontmatter="frontmatter">
          <div class="prose">
            <slot name="main-content-md" />
          </div>
          <slot />
          <slot name="main-content-after" />
        </ValaxyMd>
      </Transition>
    </slot>

    <slot name="main-nav-before" />

    <slot name="main-nav" />

    <slot name="main-nav-after" />

    <slot v-if="siteConfig.comment.enable && frontmatter.comment !== false" name="comment">
      <SakuraCommentCustom />
    </slot>

    <slot name="footer" />
  </slot>
</template>

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
  <div class="content left-0 right-0 mx-auto w-full" flex="~">
    <div flex-auto>
      <slot name="main">
        <slot name="main-header" />
        <slot name="main-header-after" />

        <slot name="main-content">
          <Transition appear>
            <ValaxyMd class="markdown-body mx-auto w-full prose max-w-none" :frontmatter="frontmatter">
              <slot name="main-content-md" />
              <slot />
            </ValaxyMd>
          </Transition>
          <slot name="main-content-after" />
        </slot>

        <slot name="main-nav-before" />

        <slot name="main-nav" />

        <slot name="main-nav-after" />

        <slot v-if="siteConfig.comment.enable && frontmatter.comment !== false" name="comment">
          <SakuraComment :class="frontmatter.nav === false ? 'mt-4' : 0" />
        </slot>

        <slot name="footer" />
      </slot>
    </div>
    <slot name="aside">
      <SakuraAside>
        <slot name="aside-custom" />
      </SakuraAside>
    </slot>
  </div>
</template>

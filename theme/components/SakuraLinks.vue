<script lang="ts" setup>
import type { Ref } from 'vue'
import { onMounted } from 'vue'
import { useStorage } from '@vueuse/core'
import { useRandomData, useThemeConfig } from '../composables'

const props = defineProps<{
  links: string | LinkType[]
  random: boolean
  /**
   * @description: 图片加载失败时显示的图片
   */
  errorImg?: string
  rss?: string | string[]
}>()

const themeConfig = useThemeConfig()

const xmlData: Ref<LinkType[]> = useStorage('xmlData', [])

const { data } = useRandomData(props.links ? props.links : [...xmlData.value || []], props.random)

interface LinkType {
  avatar: string
  name: string
  url: string
  color: string
  blog: string
  desc: string
  rss: string
}

onMounted(async () => {
  // TODO:
  await fetchXMLData(['https://www.yunyoujun.cn/atom.xml', 'https://sakura.wrxinyue.org/atom.xml', 'https://sakura.valaxy.site/atom.xml'])
})

async function fetchXMLData(urls: string[]) {
  xmlData.value = []

  const fetchSingleURL = async (url: string) => {
    try {
      const response = await fetch(url)
      if (response.ok) {
        const text = await response.text()
        const parser = new DOMParser()
        const xml = parser.parseFromString(text, 'application/xml')

        const title = xml.querySelector('title')?.textContent
        // const updated = xml.querySelector('updated')?.textContent
        const authorName = xml.querySelector('author > name')?.textContent
        // const authorEmail = xml.querySelector('author > email')?.textContent
        // const authorUri = xml.querySelector('author > uri')?.textContent
        // const linkAlternate = xml.querySelector('link[rel="alternate"]')?.getAttribute('href')
        const linkSelf = xml.querySelector('link[rel="self"]')?.getAttribute('href')
        const subtitle = xml.querySelector('subtitle')?.textContent
        const logo = xml.querySelector('logo')?.textContent
        // const icon = xml.querySelector('icon')?.textContent
        // const rights = xml.querySelector('rights')?.textContent

        // console.log('Title:', title)
        // console.log('Updated:', updated)
        // console.log('Author Name:', authorName)
        // console.log('Author Email:', authorEmail)
        // console.log('Author URI:', authorUri)
        // console.log('Link Alternate:', linkAlternate)
        // console.log('Link Self:', linkSelf)
        // console.log('Subtitle:', subtitle)
        // console.log('Logo:', logo)
        // console.log('Icon:', icon)
        // console.log('Rights:', rights)

        const data = {
          avatar: logo,
          name: authorName,
          url: linkSelf,
          color: '#EE9CA7',
          blog: title,
          desc: subtitle,
        } as LinkType

        xmlData.value.push(data)
      }
      else {
        console.error(`Failed to fetch XML from ${url}:`, response.status, response.statusText)
      }
    }
    catch (error) {
      console.error(`Error fetching XML from ${url}:`, error)
    }
  }

  await Promise.all(urls.map(fetchSingleURL))
}
</script>

<template>
  <div class="links">
    <ul class="link-items">
      <li v-for="link, i in data" :key="i" class="link-item" :style="`--primary-color: ${link.color}`">
        <a class="link-url" p="x-4 y-2" :href="link.url" :title="link.name" alt="portrait" rel="friend" target="_blank">
          <div class="link-left">

            <SakuraImageCard class="link-avatar" width="64" height="64" w="16" h="16" :src="link.avatar || themeConfig.notFoundImage" :alt="link.name" :error-img="props.errorImg" />
          </div>
          <div class="link-info" m="l-2">
            <div class="link-blog" font="serif black">{{ link.blog }}</div>
            <div class="link-desc">{{ link.desc }}</div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.link-item {
  display: inline-flex;
}

.links {
  .link-items {
    display: flex;
    text-align: center;
    justify-content: center;
    flex-wrap: wrap;

    padding-left: 0;
  }

  .link-url {
    --smc-link-color: var(--primary-color);

    display: inline-flex;
    text-align: center;
    justify-self: center;
    line-height: 1.5;
    margin: 0.5rem;
    transition: 0.2s;
    color: var(--primary-color, black);
    border: 1px solid var(--primary-color, gray);
    border-radius: var(--st-c-rd);

    &:hover {
      color: white;
      background-color: var(--primary-color, gray);
      box-shadow: 0 2px 20px var(--primary-color, gray);
    }

    .link {
      &-left {
        line-height: 0;
      }

      &-avatar {
        margin: 0;
        display: inline-flex;
        max-width: 100%;
        border-radius: 50%;
        background-color: #fff;
        border: 1px solid var(--primary-color, gray);
        transition: 0.5s;

        &:hover {
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
      }

      &-desc {
        font-size: 0.8rem;
        width: 10rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .link-info {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>

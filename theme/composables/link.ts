import type { Ref } from 'vue'
import type { LinkItem } from '../types'
import { isClient } from '@vueuse/core'
import { ref, unref, watch } from 'vue'

/**
 * Fetches and processes link data from a given source
 *
 * @param {string | LinkItem[] | Ref<string | LinkItem[] | undefined>} source - The source URL or an array of LinkItem objects
 * @param {boolean} [random] - Whether to randomize the order of the data
 */
export function useLinkData(source: string | LinkItem[] | Ref<string | LinkItem[] | undefined>, random = false) {
  const data = ref<LinkItem[]>()

  watch(() => unref(source), async (s) => {
    if (!s) {
      data.value = []
      return
    }
    let rawData: LinkItem[]
    if (typeof s === 'string') {
      if (!isClient)
        return
      rawData = (await fetch(s).then(res => res.json()) as LinkItem[]) || []
    }
    else {
      if (!isClient) {
        rawData = s
        return
      }

      rawData = []
      const fetchSingleURL = async (link: LinkItem) => {
        if (!link.rss) {
          rawData.push(link)
          return
        }
        try {
          const response = await fetch(link.rss)
          if (response.ok) {
            const text = await response.text()

            const parser = new DOMParser()
            const xml = parser.parseFromString(text, 'application/xml')

            const title = link.blog || xml.querySelector('title')?.textContent || ''
            // const updated = xml.querySelector('updated')?.textContent
            const authorName = link.name || xml.querySelector('author > name')?.textContent || ''
            // const authorEmail = xml.querySelector('author > email')?.textContent
            // const authorUri = xml.querySelector('author > uri')?.textContent
            const linkAlternate = link.url || xml.querySelector('link[rel="alternate"]')?.getAttribute('href') || ''
            // const linkSelf = link.url || xml.querySelector('link[rel="self"]')?.getAttribute('href')
            const subtitle = link.desc || xml.querySelector('subtitle')?.textContent || ''
            const logo = link.avatar || xml.querySelector('logo')?.textContent || ''
            // const icon = xml.querySelector('icon')?.textContent
            // const rights = xml.querySelector('rights')?.textContent

            const data = {
              avatar: logo,
              name: authorName,
              url: linkAlternate,
              color: '#EE9CA7',
              blog: title,
              desc: subtitle,
              rss: link.rss,
            } as LinkItem

            rawData.push(data)
          }
          else {
            console.error(`Failed to fetch XML from ${link.rss}:`, response.status, response.statusText)
          }
        }
        catch (error) {
          console.error(`Error fetching XML from ${link.rss}:`, error)
        }
      }
      await Promise.all(s.map(fetchSingleURL))
    }

    data.value = random ? Array.from(rawData).sort(() => Math.random() - 0.5) : rawData
  }, { immediate: true })

  return {
    data,
  }
}

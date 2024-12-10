import { isClient } from '@vueuse/core'
import { ref, watch } from 'vue'
import type { LinkType } from '../types'

/**
 * Fetches and processes link data from a given source
 *
 * @param {string | LinkType[]} source - The source URL or an array of LinkType objects
 * @param {boolean} [random] - Whether to randomize the order of the data
 */
export function useLinkData(source: string | LinkType[], random = false) {
  const data = ref<LinkType[]>()

  watch(() => source, async () => {
    let rawData: LinkType[]
    if (typeof source === 'string') {
      if (!isClient)
        return
      rawData = (await fetch(source).then(res => res.json()) as LinkType[]) || []
    }
    else {
      if (!isClient) {
        rawData = source
        return
      }

      rawData = []
      const fetchSingleURL = async (link: LinkType) => {
        try {
          const response = await fetch(link.rss)
          if (response.ok) {
            const text = await response.text()

            const parser = new DOMParser()
            const xml = parser.parseFromString(text, 'application/xml')

            const title = link.blog || xml.querySelector('title')?.textContent
            // const updated = xml.querySelector('updated')?.textContent
            const authorName = link.name || xml.querySelector('author > name')?.textContent
            // const authorEmail = xml.querySelector('author > email')?.textContent
            // const authorUri = xml.querySelector('author > uri')?.textContent
            const linkAlternate = xml.querySelector('link[rel="alternate"]')?.getAttribute('href')
            // const linkSelf = link.url || xml.querySelector('link[rel="self"]')?.getAttribute('href')
            const subtitle = link.desc || xml.querySelector('subtitle')?.textContent
            const logo = link.avatar || xml.querySelector('logo')?.textContent
            // const icon = xml.querySelector('icon')?.textContent
            // const rights = xml.querySelector('rights')?.textContent

            const data = {
              avatar: logo,
              name: authorName,
              url: linkAlternate,
              color: '#EE9CA7',
              blog: title,
              desc: subtitle,
            } as LinkType

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
      await Promise.all(source.map(fetchSingleURL))
    }

    data.value = random ? Array.from(rawData).sort(() => Math.random() - 0.5) : rawData
  }, { immediate: true })

  return {
    data,
  }
}

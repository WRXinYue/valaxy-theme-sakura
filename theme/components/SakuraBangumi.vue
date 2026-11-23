<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { getCardTilt } from '../core/utils/cardTilt'
import ticketStyles from '../styles/widgets/bangumi.css?inline'

const container = ref<HTMLElement>()

let observer: MutationObserver | undefined
const hoverMotion = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

// Painting the small swatch works with cross-origin posters too: no pixel readback.
function paintTicketPaper(image: HTMLImageElement) {
  const card = image.closest('.bbc-bangumi-item')
  if (!card || !image.parentElement?.matches('a'))
    return

  let paper = card.querySelector<HTMLCanvasElement>('.ticket-paper')
  if (!paper) {
    paper = document.createElement('canvas')
    paper.className = 'ticket-paper'
    paper.width = paper.height = 1
    paper.setAttribute('aria-hidden', 'true')
    card.append(paper)
  }

  const url = image.complete && image.naturalWidth
    ? image.currentSrc || image.src
    : ''
  if (url === (paper.dataset.cover || ''))
    return
  const context = paper.getContext('2d')
  if (!context)
    return
  context.clearRect(0, 0, 1, 1)
  if (url) {
    context.imageSmoothingQuality = 'high'
    context.drawImage(image, 0, 0, 1, 1)
  }
  paper.dataset.cover = url
}

function updateDetails(root: ShadowRoot) {
  for (const card of root.querySelectorAll<HTMLElement>('.bbc-bangumi-item')) {
    const content = card.querySelector<HTMLElement>('.bbc-bangumi-content')
    const title = content?.querySelector<HTMLAnchorElement>('.bbc-bangumi-title a')
    const poster = card.firstElementChild
    if (!content || !title || !(poster instanceof HTMLAnchorElement))
      continue

    let front = card.querySelector<HTMLElement>('.ticket-front')
    let flipButton = card.querySelector<HTMLButtonElement>('.ticket-flip')
    let back = card.querySelector<HTMLButtonElement>('.ticket-back')
    let source = card.querySelector<HTMLAnchorElement>('.ticket-source')
    if (!front || !flipButton || !back || !source) {
      front = document.createElement('div')
      front.className = 'ticket-front'
      front.innerHTML = '<span class="ticket-caption"><a class="ticket-source" target="_blank" rel="noopener noreferrer"></a><span class="ticket-progress"></span><span class="ticket-stats"></span></span>'
      source = front.querySelector<HTMLAnchorElement>('.ticket-source')!
      flipButton = document.createElement('button')
      flipButton.type = 'button'
      flipButton.className = 'ticket-flip'
      front.append(flipButton)
      back = document.createElement('button')
      back.type = 'button'
      back.className = 'ticket-back'
      back.setAttribute('aria-label', '翻回正面')
      const actions = document.createElement('div')
      actions.className = 'ticket-actions'
      actions.append(back)
      card.append(front, actions)

      card.onpointermove = (event) => {
        const slot = card.parentElement
        if (!slot || event.pointerType === 'touch' || !window.matchMedia(hoverMotion).matches)
          return
        const tilt = getCardTilt(slot, event)
        if (!tilt)
          return
        card.style.setProperty('--tilt-x', `${tilt.rx.toFixed(2)}deg`)
        card.style.setProperty('--tilt-y', `${tilt.ry.toFixed(2)}deg`)
        card.style.setProperty('--shine-x', `${tilt.sx.toFixed(1)}%`)
        card.style.setProperty('--shine-y', `${tilt.sy.toFixed(1)}%`)
      }
      card.onpointerleave = () => {
        card.style.removeProperty('--tilt-x')
        card.style.removeProperty('--tilt-y')
      }

      const flip = (open: boolean) => {
        card.classList.toggle('ticket-flipped', open)
        front.inert = open
        content.inert = !open
        back.hidden = !open
        if (!open)
          content.scrollTop = 0
        const focusTarget = open ? back : flipButton
        focusTarget.focus({ preventScroll: true })
      }
      flipButton.onclick = () => flip(true)
      back.onclick = () => flip(false)
      content.onclick = (event) => {
        if (event.target === content && !window.getSelection()?.toString())
          flip(false)
      }
    }

    const cover = poster.querySelector('img')
    if (cover)
      paintTicketPaper(cover)
    poster.inert = true
    const name = title.textContent?.trim() || '番剧'
    const statuses: string[] = []
    const stats = document.createElement('span')
    stats.className = 'ticket-stats'
    const caption = [name]
    const labels = Array.from(content.querySelectorAll('.bbc-bangumi-label'), label => ({
      key: label.firstElementChild?.textContent?.trim() || '',
      value: label.children[1]?.textContent?.trim() || '',
    }))
    const rating = labels.find(label => /^(?:评分|score|rating)$/i.test(label.key))
    if (rating)
      rating.value ||= '暂无'
    else
      labels.unshift({ key: '评分', value: '暂无' })

    for (const { key, value } of labels) {
      // Bangumi omits the value element for empty metrics, as it does for status labels.
      if (!value && /^(?:播放量|追番数|投币数|弹幕数)$/.test(key))
        continue

      if (key || value)
        caption.push([key, value].filter(Boolean).join(' '))

      if (!key || !value) {
        if (key || value)
          statuses.push(key || value)
        continue
      }

      const item = document.createElement('span')
      item.className = 'ticket-stat'
      const statName = document.createElement('span')
      statName.textContent = key
      const statValue = document.createElement('b')
      statValue.textContent = value
      item.append(statName, statValue)
      stats.append(item)
    }
    const currentStats = front.querySelector('.ticket-stats')
    if (!stats.isEqualNode(currentStats))
      currentStats?.replaceWith(stats)

    // Stencil may reuse a card on a filter or page change.
    if (source.getAttribute('href') !== title.href) {
      source.href = title.href
      card.classList.remove('ticket-flipped')
      front.inert = false
      content.inert = true
      content.scrollTop = 0
      back.hidden = true
    }
    flipButton.setAttribute('aria-label', `${caption.filter(Boolean).join('，')}。查看详情`)
    source.setAttribute('aria-label', `观看《${name}》（新窗口）`)
    for (const [selector, text] of [
      ['.ticket-source', name],
      [
        '.ticket-progress',
        statuses.join(' · '),
      ],
    ]) {
      const field = front.querySelector(selector)!
      if (field.textContent !== text)
        field.textContent = text
    }
  }
}

onBeforeUnmount(() => observer?.disconnect())

onMounted(async () => {
  // The addon registers its shadow-DOM component asynchronously.
  await customElements.whenDefined('bilibili-bangumi')
  const root = container.value?.querySelector('bilibili-bangumi')?.shadowRoot
  if (root) {
    const style = document.createElement('style')
    style.textContent = ticketStyles
    root.append(style)
    // Lazy posters often finish after the card has been rendered.
    root.addEventListener('load', (event) => {
      if (event.target instanceof HTMLImageElement)
        paintTicketPaper(event.target)
    }, true)
    updateDetails(root)
    observer = new MutationObserver(() => updateDetails(root))
    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['href', 'src'],
    })
  }
})
</script>

<template>
  <div ref="container" class="sakura-bangumi">
    <ValaxyBangumi />
  </div>
</template>

<style scoped>
.sakura-browse-content .sakura-bangumi :deep(bilibili-bangumi) {
  --bbc-primary-color: var(--sakura-color-primary);
  --bbc-text-base-color: var(--sakura-color-text);
  --bbc-label-color: var(--sakura-color-text-muted);

  display: block;
  font-family: inherit;
}
</style>

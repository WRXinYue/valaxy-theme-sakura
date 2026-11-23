import type { Ref } from 'vue'
import { useEventListener, useResizeObserver } from '@vueuse/core'
import { onContentUpdated } from 'valaxy'
import { onMounted, shallowRef } from 'vue'

export function useCodeGroupIndicator(content: Ref<HTMLElement | null>) {
  const observed = shallowRef<HTMLElement[]>([])

  function update(tabs: HTMLElement) {
    const label = tabs.querySelector<HTMLElement>(':scope > input:checked + label')
    if (!label?.offsetWidth)
      return

    tabs.style.setProperty('--sakura-code-tab-offset', `${label.offsetLeft}px`)
    tabs.style.setProperty('--sakura-code-tab-width', `${label.offsetWidth}px`)
    tabs.classList.add('has-sliding-indicator')
  }

  function refresh() {
    const groups = Array.from(content.value?.querySelectorAll<HTMLElement>('.vp-code-group > .tabs') ?? [])
    observed.value = groups.flatMap(tabs => [
      tabs,
      ...tabs.querySelectorAll<HTMLElement>(':scope > label'),
    ])
    groups.forEach(update)
  }

  useResizeObserver(observed, (entries) => {
    for (const { target } of entries) {
      const tabs = target.closest<HTMLElement>('.tabs')
      if (tabs)
        update(tabs)
    }
  })

  useEventListener(content, 'change', (event) => {
    const input = event.target
    if (input instanceof HTMLInputElement && input.matches('.vp-code-group > .tabs > input:checked'))
      update(input.parentElement!)
  })

  onMounted(refresh)
  onContentUpdated(refresh)
}

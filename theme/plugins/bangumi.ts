import styles from '../styles/plugins/bangumi.scss?raw'

function injectStyleToShadowRoot(shadowRoot: ShadowRoot, styles: string) {
  if (shadowRoot.querySelector('style[data-bangumi]'))
    return

  const style = document.createElement('style')
  style.setAttribute('data-bangumi', 'true')
  style.textContent = styles
  shadowRoot.appendChild(style)
}

export function applySakuraBangumiStyles() {
  customElements.whenDefined('bilibili-bangumi').then(() => {
    const bangumiElement = document.querySelector<HTMLElement>('bilibili-bangumi')
    const bangumiShadowRoot = bangumiElement?.shadowRoot

    if (!bangumiShadowRoot) {
      console.warn('bilibili-bangumi element or shadowRoot not found.')
      return
    }

    injectStyleToShadowRoot(bangumiShadowRoot, styles)
  })
}

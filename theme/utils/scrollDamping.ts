import type Lenis from '@studio-freight/lenis'

let lenis: Lenis

function raf(time: any) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

export async function startScrollDamping() {
  if (window.innerWidth >= 768) {
    const LenisModule = await import('@studio-freight/lenis')
    const Lenis = LenisModule.default
    lenis = new Lenis({ lerp: 0.04 })

    requestAnimationFrame(raf)
  }
}

export function scrollToTop() {
  lenis.scrollTo(0, {
    offset: 0,
    immediate: false,
  })
}

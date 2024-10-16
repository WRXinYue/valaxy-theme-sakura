import { ref } from 'vue'
import Lenis from 'lenis'

export const lenis = ref<Lenis>()

function raf(time: any) {
  lenis.value!.raf(time)
  requestAnimationFrame(raf)
}

export async function initLenis() {
  lenis.value = new Lenis({ lerp: 0.04 })

  requestAnimationFrame(raf)
}

import Lenis from 'lenis'
import { ref } from 'vue'

export const lenisRef = ref<Lenis>()

function raf(time: any) {
  lenisRef.value!.raf(time)
  requestAnimationFrame(raf)
}

export async function initLenis() {
  lenisRef.value = new Lenis({ lerp: 0.04 })

  requestAnimationFrame(raf)
}

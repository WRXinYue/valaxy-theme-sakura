import type { Directive } from 'vue'

export const vAnimateOnView: Directive = {
  mounted: (el: HTMLElement, binding) => {
    const animationClass = binding.value || 'sakura-fade-in-up'
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add(animationClass)
          observer.unobserve(el)
        }
      })
    })
    observer.observe(el)
  },
}

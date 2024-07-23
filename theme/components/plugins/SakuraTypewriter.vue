<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { Options } from 'typeit'
import TypeIt from 'typeit'

const props = withDefaults(defineProps<{
  [key: string]: any
} & Partial<TypewriterProps>>(), {
  delay: 75,
  typeString: '',
})

const emit = defineEmits(['typingFinished', 'deletionFinished'])

export interface TypewriterProps {
  /**
   * @default 75
   *
   * The delay between each key when typing
   */
  delay: number
  /**
   * The delay between deleting each character
   */
  deleteSpeed: number
  /**
   * @default false
   *
   * Whether to keep looping or not
   */
  loop: boolean
  /**
   * @default 1500
   *
   * The pause duration after a string is typed when using autostart mode
   */
  pauseFor: number | number[]
  /**
   * String to type out, it can contain HTML tags
   * Type out a string using the typewriter effect
   */
  typeString: string | string[]
  /**
   * Speed to delete all visibles nodes, can be number or 'natural'
   * Delete everything that is visible inside of the typewriter wrapper element
   */
  deleteAll: number | boolean | number[]
}

const typewriterElement = ref<HTMLElement | null>(null)
let refreshNeeded = false
let instance: TypeIt | null = null
let hasInitialized = false

onMounted(() => {
  createTypewriter(Array.isArray(props.typeString) ? props.typeString : [props.typeString])
})

function createTypewriter(typeStrings: string[]) {
  const options = {
    deleteSpeed: props.deleteSpeed,
    loop: props.loop,
  } as Options

  if (instance !== null)
    destroyTypewriter()

  instance = new TypeIt(typewriterElement.value!, options)

  // const typeStrings = Array.isArray(props.typeString) ? props.typeString : [props.typeString]

  typeStrings.forEach((str, index) => {
    // TODO: Add typing speed config
    instance!.type(str)

    if (typeof props.pauseFor === 'number')
      instance!.pause(props.pauseFor)
    else if (Array.isArray(props.pauseFor))
      instance!.pause(props.pauseFor[index])

    instance!.exec(() => {
      emit('typingFinished', str)
    })

    if (props.deleteAll === true) {
      instance!.delete()
    }
    else if (typeof props.deleteAll === 'number') {
      for (let i = 0; i < str.length; i++) {
        instance!.delete(1, { delay: props.deleteAll })
      }
    }
    else if (Array.isArray(props.deleteAll)) {
      for (let i = 0; i < str.length; i++) {
        instance!.delete(1, { delay: props.deleteAll[index] })
      }
    }
  })
  instance.go()

  instance.flush(() => {
    emit('deletionFinished')

    // If typeString changes, refresh in the next step
    if (refreshNeeded) {
      refreshNeeded = false
      destroyTypewriter()
      createTypewriter(Array.isArray(props.typeString) ? props.typeString : [props.typeString])
    }
  })
}

function destroyTypewriter() {
  if (instance) {
    instance.destroy()
    instance = null
  }
}

watch(() => props.typeString, () => {
  refreshNeeded = true
  if (!hasInitialized) {
    createTypewriter(Array.isArray(props.typeString) ? props.typeString : [props.typeString])
    hasInitialized = true
  }
})

onUnmounted(() => {
  destroyTypewriter()
})
</script>

<template>
  <span ref="typewriterElement" />
</template>

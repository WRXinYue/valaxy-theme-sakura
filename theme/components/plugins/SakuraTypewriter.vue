<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

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
   * @default false
   *
   * Whether or not to display console logs
   */
  devMode: boolean
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
const refreshNeeded = ref(false)

onMounted(async () => {
  // @ts-expect-error missing types
  const TypewriterModule = await import('typewriter-effect/dist/core')
  const Typewriter = TypewriterModule.default

  const createTypewriter = (typeStrings: string[]) => {
    const options = {
      delay: props.delay,
      deleteSpeed: props.deleteSpeed,
      loop: props.loop,
      devMode: props.devMode,
    } as unknown as TypewriterProps

    if (typeof props.pauseFor === 'number')
      options.pauseFor = props.pauseFor

    const typewriter = new Typewriter(typewriterElement.value, options)

    // const typeStrings = Array.isArray(props.typeString) ? props.typeString : [props.typeString]
    const pauseForArray = Array.isArray(props.pauseFor) ? props.pauseFor : [props.pauseFor]
    const deleteAllArray = Array.isArray(props.deleteAll) ? props.deleteAll : [props.deleteAll]

    typeStrings.forEach((str, index) => {
      typewriter.typeString(str)

      if (pauseForArray[index] !== undefined)
        typewriter.pauseFor(pauseForArray[index])

      typewriter.callFunction(() => {
        emit('typingFinished', str)
      })

      if (props.deleteAll === true)
        typewriter.deleteAll()
      else if (typeof props.deleteAll === 'number')
        typewriter.deleteAll(props.deleteAll)
      else if (deleteAllArray[index])
        typewriter.deleteAll(deleteAllArray[index])

      typewriter.callFunction(() => {
        emit('deletionFinished', str)

        if (refreshNeeded.value) {
          refreshNeeded.value = false
          typewriter.stop()
          createTypewriter(Array.isArray(props.typeString) ? props.typeString : [props.typeString])
        }
      })
    })
    typewriter.start()
  }

  createTypewriter(Array.isArray(props.typeString) ? props.typeString : [props.typeString])

  watch(() => props.typeString, () => {
    refreshNeeded.value = true
  }, { deep: true })
})
</script>

<template>
  <span ref="typewriterElement" />
</template>

import { defineAppSetup } from 'valaxy'
import type { PluginOptions } from 'vue-toastification'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options: PluginOptions = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
}

export default defineAppSetup(async (_ctx) => {
  const { app, isClient } = _ctx
  if (!isClient)
    return

  app.use(Toast, options)
})

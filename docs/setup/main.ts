import { defineAppSetup } from 'valaxy'
import PrimeVue from 'primevue/config'

export default defineAppSetup(async (_ctx) => {
  const { app } = _ctx
  app.use(PrimeVue)
})

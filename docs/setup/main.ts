import { defineAppSetup } from 'valaxy'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export default defineAppSetup(async ({ app }) => {
  app.use(ElementPlus)
})

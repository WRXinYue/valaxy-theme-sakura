// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    ignores: ['**/dist', '**/public', '**/styles/animation', 'packages/valaxy-addon-live2d'],
  },
  {
    rules: {
      'ts/no-unused-expressions': 'off',
    },
  },
)

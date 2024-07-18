// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    ignores: ['**/dist', '**/public', '**/styles/animation', '**/*.md', 'packages/'],
  },
  {
    rules: {
      'ts/no-unused-expressions': 'off',
    },
  },
)

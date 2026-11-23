// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    ignores: ['**/dist', '**/public', '**/styles/animation'],
  },
  {
    rules: {
      'ts/no-unused-expressions': 'off',
      // Keep the legacy branch's existing import and formatting conventions.
      'antfu/reasonable-newline': 'off',
      'perfectionist/sort-imports': 'off',
      'format/prettier': 'off',
    },
  },
)

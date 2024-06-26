import { expect, test } from '@playwright/test'
import { env } from '../env'

test.use({
  baseURL: env['theme-sakura'],
})

test.describe('Encrypted Post', () => {
  test('encrypted post', async ({ page }) => {
    await page.goto('/posts/encrypted-post')

    await page.waitForSelector('.markdown-body')
    await expect(page.locator('.decrypt-password-container')).toHaveCount(1)

    await page.fill('.decrypt-password-container input', 'valaxy')
    await page.press('.decrypt-password-container input', 'Enter')

    await expect(page.locator('p')).toContainText(['这里是被加密的复杂文章内容'])
  })
})

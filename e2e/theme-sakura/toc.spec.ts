import { expect, test } from '@playwright/test'
import { env } from '../env'

test.use({
  baseURL: env['theme-sakura'],
})

test.describe('TOC', () => {
  test('toc generate', async ({ page }) => {
    await page.goto('/posts/hello-valaxy')

    await expect(page.locator('.yun-aside')).toHaveCount(1)
    await expect(page.locator('.yun-aside .va-toc-item')).toHaveCount(2)

    const vaTocItem = page.locator('.yun-aside .va-toc-item').nth(0)
    await expect(vaTocItem).toHaveAttribute('lang', 'en')
    await expect(vaTocItem).toHaveText('What is Valaxy?')
  })
})

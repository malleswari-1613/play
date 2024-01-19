import { test, expect } from '@playwright/test';
function generateRandomString(length: number): string {
  const characters = '-{}_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}
test('test', async ({ page }) => {
  await page.goto('http://major-neo.stockone.com/v2/');
  await page.goto('http://major-neo.stockone.com/v2/#/');
  await page.getByPlaceholder('Username').fill('su');
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('subuser1@stockone.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('97nBi4_jD');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.goto('http://major-neo.stockone.com/v2/#/inventory/summary');
  await page.getByRole('link', { name: '' }).click();
  await page.locator('a').filter({ hasText: 'Masters' }).click();
  await page.getByRole('link', { name: 'SKU Master' }).click();
  await page.getByRole('button', { name: 'Add SKU' }).click();
  await page.getByPlaceholder('Enter SKU Code').click();
  await page.getByPlaceholder('Enter SKU Code').fill(generateRandomString(5));
  await page.getByPlaceholder('Enter SKU Desc').click();
  await page.getByPlaceholder('Enter SKU Desc').fill(generateRandomString(5));
  await page.getByRole('button', { name: 'Add', exact: true }).click();
//   await page.getByText('New SKU Code Added').click();

  await expect(page.getByText('New SKU Code Added')).toBeVisible();
});
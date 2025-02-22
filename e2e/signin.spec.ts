import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('textbox', { name: 'Email address or username' }).click();
  await page.getByRole('textbox', { name: 'Email address or username' }).fill('Rorschache');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Music@992519');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.locator('section').filter({ hasText: 'Supercharge Your Social Media' }).getByRole('button').click();
});

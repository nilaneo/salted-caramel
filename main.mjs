import puppeteer from 'puppeteer';
import { sleep } from './lib/utils';
const { SALTED_CARAMEL_USERNAME, SALTED_CARAMEL_PASSWORD } = process.env;

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });

  // 1. Open Login Page
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/accounts/login/');

  // 2. Enter login
  await page.type('input[name="username"]', SALTED_CARAMEL_USERNAME, { delay: 100 });

  // 3. Enter password
  await page.type('input[name="password"]', SALTED_CARAMEL_PASSWORD, { delay: 100 });

  // 4. Submit form
  await page.click('form button');

  await sleep(5000);

  await browser.close();
})();

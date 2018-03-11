import puppeteer from 'puppeteer';
import { sleep } from './lib/utils';

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/accounts/login/');

  await sleep(5000);

  await browser.close();
})();

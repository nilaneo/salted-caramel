import puppeteer from 'puppeteer';
import { sleep } from './lib/utils';
const { SALTED_CARAMEL_USERNAME, SALTED_CARAMEL_PASSWORD } = process.env;

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });

  // 1. Login
  // 1.1. Open Login Page
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/accounts/login/');

  // 1.2. Enter login
  await page.type('input[name="username"]', SALTED_CARAMEL_USERNAME, { delay: 100 });

  // 1.3. Enter password
  await page.type('input[name="password"]', SALTED_CARAMEL_PASSWORD, { delay: 100 });

  // 1.4. Submit form
  await page.click('form button');

  const hashtags = [
    'simplebeyond',
    'vsco'
  ];
  // 2. For each hashtag search posts by hashtag
  for (let hashtag of hashtags) {
    // 2.1. Open page for hashtag
    await page.goto(`https://www.instagram.com/explore/tags/${hashtag}`);

    // 2.2. Get IDs of N most recent photos
    // 2.2.1. Get all visible most recent items
    const allMostRecentPhotoIds = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h2')[1].nextSibling.querySelectorAll('a')).filter(a => !a.querySelector('.coreSpriteVideoIconSmall')).map(a => a.href.match(/\/p\/(.+)\//)[1]);
    });
    // 2.2.2. Get N items from most recent items
    const numberOfPhotosPerHashtag = 5;
    const mostRecentPhotoIds = allMostRecentPhotoIds.slice(0, numberOfPhotosPerHashtag);
  }

  await browser.close();
})();

import puppeteer from 'puppeteer';
import { sleep } from './lib/utils';
const { SALTED_CARAMEL_USERNAME, SALTED_CARAMEL_PASSWORD } = process.env;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 300
  });

  // 1. Login
  // 1.1. Open Login Page
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/accounts/login/');

  // 1.2. Enter login
  await page.type('input[name="username"]', SALTED_CARAMEL_USERNAME);

  // 1.3. Enter password
  await page.type('input[name="password"]', SALTED_CARAMEL_PASSWORD);

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
    // 2.2.1. Get all visible most recent photos
    const allMostRecentPhotoIds = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h2')[1].nextSibling.querySelectorAll('a')).map(a => a.href.match(/\/p\/(.+)\//)[1]);
    });
    // 2.2.2. Get N photos from most recent photos
    const numberOfPhotosPerHashtag = 2;
    const mostRecentPhotoIds = allMostRecentPhotoIds.slice(0, numberOfPhotosPerHashtag);

    // 3. For each photo like it and engage with its author if the photo is not liked yet
    for(let photoId of mostRecentPhotoIds) {
      // 3.1. Like photo
      // 3.1.1. Open photo page
      await page.goto(`https://www.instagram.com/p/${photoId}`);
      // 3.1.2. Click like button
      const isLikedAlready = await page.$('.coreSpriteHeartFull');
      if (!isLikedAlready) {
        await page.click('.coreSpriteHeartOpen');

        // 3.2. Engage with author
        // 3.2.1. Open author's page
        // 3.2.2. Engage with it if number of followers is less then M and not following yet
        // 3.2.2.1. Get K random photos from L latest
        // 3.2.2.2. Like each photo
        // 3.2.2.2.1. Open photo page
        // 3.2.2.2.2. Like the photo if one is not liked yet
        // 3.2.2.3. Follow author
      }
    }
  }

  await browser.close();
})();

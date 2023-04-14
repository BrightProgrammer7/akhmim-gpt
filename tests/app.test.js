// ```js
// import the necessary modules from Playwright
import { chromium } from 'playwright';
import jestGlobals from '@jest/globals';

// const { describe, beforeAll, afterAll, test } = jestGlobals;
const { describe, beforeAll, afterAll, test, it } = jestGlobals;


describe('React App', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:5173');
  });

    afterAll(async () => {
      await browser.close();
    });


    test('React App', async () => {
      const title = await page.title();
      expect(title).toBe('AkhmimGPT');
    });

    it('should display the app title', async () => {
      const appTitle = await page.$eval('title', (el) => el.textContent);
      expect(appTitle).toEqual('AkhmimGPT');
    });


    // it('should fill out and submit a form', async () => {
    //   await page.fill('#name', 'AKHMIM');
    //   await page.fill('#email', 'akhmim@example.com');
    //   await page.fill('#message', 'This is a test message.');
    //   await page.click('#submit');
    //   await page.waitForSelector('#success-message');
    //   const successMessage = await page.$eval('#success-message', (el) => el.textContent);
    //   expect(successMessage).toBe('Thank you for your message!');
    // });

})

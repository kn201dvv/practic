const {test, expect} = require ('@playwright/test')
const yaml = require('js-yaml')
const fs = require('fs')
const config = yaml.load(fs.readFileSync('./tests/info.yml', 'utf8'));


test('log',async ({page})=>{
    const emailField =  page.getByTestId('royal_email');
    const passField = page.getByTestId('royal_pass');
    const repeats = config.repeatTimes;
    const search = config.searchFor;

    await page.goto('https://www.facebook.com');
   // const context = await browser.newContext();
    await emailField.click();
    await emailField.fill(config.login);
    await passField.click();
    await passField.fill(config.password);
    await page.getByTestId('royal_login_button').click();
   // let articleOne = await page.locator('div[data-pagelet="FeedUnit_0"]')
  //  let articleTwo = await page.locator('div[data-pagelet="FeedUnit_1"]')
   // let articleOthers = await page.locator('div[data-pagelet="FeedUnit_{n}"]')
    for(let i = 0;i < repeats;i++) {
        let articleOne = await page.locator('div[data-pagelet="FeedUnit_0"]')
        let articleTwo = await page.locator('div[data-pagelet="FeedUnit_1"]')
        let articleOthers = await page.locator('div[data-pagelet="FeedUnit_{n}"]')
        if(i==0){
            await articleOne.scrollIntoViewIfNeeded();
            await page.getByRole('button', { name: 'Нравится' }).filter({ hasText: 'Нравится' }).nth(i).click();
        }
        if(i==1){
            await articleTwo.scrollIntoViewIfNeeded();
            await page.getByRole('button', { name: 'Нравится' }).filter({ hasText: 'Нравится' }).nth(i).click();
        }
        if(i>1){
            await articleOthers.nth(i-2).scrollIntoViewIfNeeded();
            await page.getByRole('button', { name: 'Нравится' }).filter({ hasText: 'Нравится' }).nth(i-2).click();
        }
    }
            //await page.getByRole('button', { name: 'Нравится' }).filter({ hasText: 'Нравится' }).first().click();


    await page.pause()
    // ---------------------
   // await context.close();
   // await browser.close();
})
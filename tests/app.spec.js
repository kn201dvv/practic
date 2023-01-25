const {test, expect} = require ('@playwright/test')
const yaml = require('js-yaml')
const fs = require('fs')
const config = yaml.load(fs.readFileSync('./tests/info.yml', 'utf8'));


test('log',async ({page})=>{
    const emailField = page.locator('input[name="email"]');
    const passField = page.locator('input[name="pass"]');
    const repeats = config.repeatTimes;
    const search = config.searchFor;

    await page.goto('https://m.facebook.com/login/?locale2=ru_RU');
    await  emailField.click();
    await  emailField.press('Control+a');
    await  emailField.fill(config.login);
    await  passField.click();
    await  passField.press('Control+a');
    await  passField.fill(config.password);
    await  page.locator('button[name="login"]').click();
    await  page.locator('span:has-text("Не сейчас")').click();
    //await  page.locator('a[name="Лента новостей"]').click();
    //const storyContainer = page.locator('div[class="story_body_container"]');
    //await  page.locator("div:has(p) >> nth=0").click();
    //let list = await page.$$('p');

    //for(let i =0;i<repeats;i++){
        //await page.locator('div[class="story_body_container"]:has(p)').nth(i).scrollIntoViewIfNeeded();
        //const links = page.locator('div[class="story_body_container"]:has(p)').first();
        //await expect(links).toContainText(search);
        //await links.count();
    //}

     //for(let i = 0;i<repeats;i++) {
       //   let article = await page.getByRole('article').filter({hasText: 'Приветствую'}).nth(i);

         // if (article) {
         //     await page.locator('a:has-text("Нравится")').nth(i).click();
        //  }
     // }

   // for(let i = 0;i < repeats;i++) {
    //    let article = await page.getByRole('article');
   //     await page.getByRole('article').filter({hasText: search}).locator('a:has-text("Нравится")').nth(i).click();
   // }


    //await article.filter({hasText:search});

   // await page.getByRole('button', { name: 'Нравится' }).click();
  //  await  page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await  page.pause()
})



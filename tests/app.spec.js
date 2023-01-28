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
    const str = [];
    //page.on('console', msg => console.log(msg.text()))
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
     for(let i = 0;i < repeats;i++) {
         let article = await page.getByRole('article').nth(i);
        // let end = await page.locator('span:has-text("Хотите видеть больше публикаций?")')
         await article.scrollIntoViewIfNeeded();
        // await run(i, page, search)
       //  await endApp(end, page);
          if (await run(i, page, search)) {

              await article.scrollIntoViewIfNeeded();
             await article.locator('a:has-text("Нравится")').click();
              test.setTimeout(10000)
          }
          else{
              continue;
              test.setTimeout(10000)
          }
      }

    //for(let i = 0;i < repeats;i++) {
       // let newsBlock = await  page.locator('div[id="MNewsFeed"]');
       // let nextArticle = await page.getByRole('article').nth(i);
        //await nextArticle.scrollIntoViewIfNeeded()
        //let article = await newsBlock.getByRole('article').filter({hasText: search}).nth(i);
      //  await nextArticle.locator('a:has-text("Нравится")').nth(i).click();
        //await article.scrollIntoViewIfNeeded();


        //await page.getByRole('article').filter({hasText: search}).locator('a:has-text("Нравится")').nth(i).click();
        //await expect.soft(article).toContainText(search);
      // if(await article.filter({hasText: search})){
          //await  article.locator('a:has-text("Нравится")').nth(i).click();
     //   }
   // }


  //  let article = await page.getByRole('article').filter({hasText: search});
 //   const lenght = article.count();
   // for(let i = 0;i < repeats;i++) {
    //    for(let j = 0;j < lenght;j++){
      //      if(page.getByRole('article').nth(i)==article.nth(j))
      //          await article.locator('a:has-text("Нравится")').nth(i).click()
     //   }

  //  }

    //for(let i = 0;i<repeats;i++) {
    //   let article = await page.getByRole('article').nth(i);

    // if (article == await page.getByRole('article').filter({hasText: 'Приветствую'})) {
    //     await page.locator('a:has-text("Нравится")').nth(i).click();
    //  }
    // }

    //await article.filter({hasText:search});

   // await page.getByRole('button', { name: 'Нравится' }).click();
  //  await  page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await  page.pause()
   // await  page.locator('a[name="Ещё"]').click();
   // await  page.locator('a[data-sigil="logout"]').click();
  //  await  page.pause()
})

async function run(i, page, search) {
    const str = [];
    const data = (await page.getByRole('article').nth(i).filter({hasText: search}).allInnerTexts()).toString();
    if(data != str){
        console.log('success');
        return true
    }
    else{
        console.log('mismatch');
        return  false
    }
  //  console.log(data); // will print your data
}
async function endApp(end, page){
    const data = await page.locator('span:has-text("Хотите видеть больше публикаций?")').innerText();

    console.log(data);
    //return true;
}

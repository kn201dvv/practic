const {test, expect} = require ('@playwright/test')
const yaml = require('js-yaml')
const fs = require('fs')
const config = yaml.load(fs.readFileSync('./tests/info.yml', 'utf8'));


test('log',async ({page})=>{
    const emailField = page.locator('input[name="email"]');
    const passField = page.locator('input[name="pass"]');
    const repeats = config.repeatTimes;
    const search = config.searchFor;
    const reply = config.replyWith;
    const textArea = await page.locator('#composerInput');

    await page.goto('https://m.facebook.com/login/?locale2=ru_RU');
    await  emailField.click();
    await  emailField.press('Control+a');
    await  emailField.fill(config.login);
    await  passField.click();
    await  passField.press('Control+a');
    await  passField.fill(config.password);
    await  page.locator('button[name="login"]').click();
    await  page.locator('span:has-text("Не сейчас")').click();

   // let liked = 0;
    let commented = 0;
    let i = 1;
    await page.pause()
    await page.locator('body').press('Alt+ArrowLeft');
    while(commented < repeats){
        const article = await page.getByRole('article').nth(i);
        await article.scrollIntoViewIfNeeded();

        const articleContent = await article.innerText();
        console.info("content: " +articleContent+ " \n");
        if (articleContent.toLowerCase().includes(search.toLowerCase())) {
            const commentElement =  await article.getByRole('link',{name: 'Комментировать'});
            await commentElement.click();
            await textArea.click();
            await textArea.fill(reply);
            await page.getByRole('button',{name:'Отправить'}).click();
            await page.waitForTimeout(3_000);
            commented ++;
            await page.goBack();
           // const likeElement = await article.locator('a:has-text("Нравится")');
            // await likeElement.scrollIntoViewIfNeeded();
           // await likeElement.click();
           // liked ++;
        } else {
            console.info("The article content does not include " +search+ " - skipped");
        }
        await page.waitForTimeout(3_000);
        i++;
    }

})
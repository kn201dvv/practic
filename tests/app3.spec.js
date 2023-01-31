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

    let liked = 0;
    let i = 0
    while(liked < repeats){

        let article = await page.getByRole('article').nth(i);
        i++;
        if(await endApp(page)){
            break
        }
        await article.scrollIntoViewIfNeeded();
        if (await run(i-1, page, search)) {

            await article.scrollIntoViewIfNeeded();
            await article.locator('a:has-text("Нравится")').click();
            liked++;

        }

    }
    await  page.pause()
})

async function run(i, page, search) {
    const str = [];
    const data = (await page.getByRole('article').nth(i).filter({hasText: search}).allInnerTexts()).toString();
    //const data1 = (await page.getByRole('article').nth(i).filter({hasText: search}).allInnerTexts())
  //  console.log(data1);
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
async function endApp(page){
    if(await page.isVisible('span:has-text("Хотите видеть больше публикаций?")')){
        console.log("checked")
        return true
    }
    else{
        console.log("no element")
    }
    //return true;
}

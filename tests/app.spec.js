const {test, expect} = require ('@playwright/test')
const yaml = require('js-yaml')
const fs = require('fs')
const config = yaml.load(fs.readFileSync('./tests/info.yml', 'utf8'));

test('log',async ({page})=>{
    await page.goto('https://m.facebook.com/login/?locale2=ru_RU');
    await  page.locator('input[name="email"]').click();
    await  page.locator('input[name="email"]').press('Control+a');
    await  page.locator('input[name="email"]').fill(config.login);
    await  page.locator('input[name="pass"]').click();
    await  page.locator('input[name="pass"]').press('Control+a');
    await  page.locator('input[name="pass"]').fill(config.password);
    await  page.locator('button[name="login"]').click();
})



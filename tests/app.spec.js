const {test, expect} = require ('@playwright/test')
const yaml = require('js-yaml')
const fs = require('fs')
const config = yaml.load(fs.readFileSync('./tests/info.yml', 'utf8'));


test('log',async ({page})=>{
    const emailField = page.locator('input[name="email"]');
    const passField = page.locator('input[name="pass"]');
    
    await page.goto('https://m.facebook.com/login/?locale2=ru_RU');
    await  emailField.click();
    await  emailField.press('Control+a');
    await  emailField.fill(config.login);
    await  passField.click();
    await  passField.press('Control+a');
    await  passField.fill(config.password);
    await  page.locator('button[name="login"]').click();
})



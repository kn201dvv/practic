const {test, expect} = require ('@playwright/test')
const yaml = require('js-yaml')
const fs = require('fs')
const config = yaml.load(fs.readFileSync('./tests/info.yml', 'utf8'));

test('log',async ({page})=>{
    await page.goto('https://www.youtube.com');


    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByRole('textbox', { name: 'Email or phone' }).click();
    await page.getByRole('textbox', { name: 'Email or phone' }).fill(config.login);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).fill(config.password);
    await page.getByRole('button', { name: 'Next' }).click();
    //await page.getByRole('button', { name: 'Not now' }).click();

    // ---------------------

})

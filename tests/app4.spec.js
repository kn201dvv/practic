const {test, expect} = require ('@playwright/test')
const yaml = require('js-yaml')
const fs = require('fs')
const config = yaml.load(fs.readFileSync('./tests/info.yml', 'utf8'));

test('log',async ({page})=>{
    config.name++;
    fs.writeFile('./tests/info.yml', yaml.dump(config), (err) => {
        if (err) {
            console.log(err);
        }
    });
    const email = page.getByRole('textbox', { name: 'Email or phone' })
    const next = page.getByRole('button', { name: 'Next' })
    await page.goto('https://www.google.com/intl/ru/gmail/about/');
    await page.getByRole('link', { name: 'Войти' }).click();
    await email.click(); await email.fill(config.loginAcc);
    await next.click();
    const pass = page.getByRole('textbox', { name: 'Enter your password' })
    await pass.click();
    await pass.fill(config.passwordAcc);
    await next.click();

    const account = page.getByRole('button', { name: 'Обліковий запис Google: Валерія Дяченко (kn201_dvv@student.ztu.edu.ua)'})

    await page.getByRole('link', { name: 'Із зірочкою' }).click();
    await page.getByRole('link', { name: 'Відкладені' }).click();
    await page.getByRole('link', { name: 'Надіслані' }).click();
    await page.locator('div').filter({ hasText: 'Чернетки' }).nth(2).click();
    await page.getByRole('button', { name: 'Більше' }).first().click();
    await page.getByRole('link', { name: 'Спам' }).click();

    await page.getByRole('link', { name: 'Створити нову мітку' }).click();
    const point =  page.getByLabel('Введіть назву нової мітки:')
    await point.click();
    await point.fill(config.name.toString());
    await page.getByRole('button', { name: 'Створити' }).click();

    await page.getByRole('button', { name: 'Написати' }).click();
    const send = page.getByRole('combobox')
    const them = page.getByPlaceholder('Тема')
    await page.getByRole('button', { name: 'Закрити' }).click();
    const textArea =  page.getByRole('textbox', { name: 'Текст повідомлення' })
    await send.click();
    await send.fill(config.sendTo);
    await page.getByRole('combobox').press('Enter');
   await send.click();

    await them.click();
    await them.fill(config.theme);
    await textArea.click();
    await textArea.fill(config.text);
  //  await page.pause()
    await page.getByRole('button', { name: 'Надіслати' }).click();
    const alert = page.getByRole('alert').filter({ hasText: 'Повідомлення надіслано'})
   //await page.getByRole('button', { name: 'Ок' }).click();

    await account.click();
    await page.frameLocator('iframe[name="account"]').getByRole('link', { name: 'Вийти' }).click();
   await page.getByRole('link', { name: 'Видалити обліковий запис' }).click();
    await page.getByRole('link', { name: 'Валерія Дяченко kn201_dvv@student.ztu.edu.ua' }).click();
    await page.getByRole('button', { name: 'Так, видалити' }).click();
    await page.pause()
})

//loginAcc: kn201_dvv@student.ztu.edu.ua
//passwordAcc: '589234'
//sendTo: ntrt2036@gmail.com
//theme: this is a new message
//text: hello!)
//name: 2

const puppeteer = require('puppeteer');
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');

// ToDo: set up cron job
// ToDo: save result to a json file

// ToDo: create file to display the price changes

(async () => {
  const browser = await puppeteer.launch();
  const baseURL = 'https://www.amazon.co.jp/dp/';
  const urls = [
    'B005I54882',
    'B005PM3YII',
    'B003XNTTYY',
    'B091SMJLP6',
    'B0064CZ1XE',
    'B00HFG1QSM',
    'B016XPPJ4W',
    'B00HFG1QSC',
    'B004X1V1CS',
    'B08Z3D14TC',
    'B019CGY2ZG',
    'B08QN55X7B',
    'B09LMTQK6P',
    'B07Q85C6VX',
    'B00KVI76ZS',
    'B086V2NKW6',
    'B014POFNPI',
    'B07H33TBB2',
    'B07DNX4TT5',
    'B002VBV1S6',
    'B00N1RM8CM',
    'B07BD2B1CT',
    'B0776L9W8C',
    'B000FC0XV4',
    'B003P2WO5E',
    'B01MYEM8SZ',
    'B004J4XGN6',
    'B00316UMS0',
    '0143129252',
    'B07637KVXL',
    'B07DBRBP7G',
    'B00FOVTOMA',
    'B005J3IEZQ',
    'B006I1AE92',
    'B00555X8OA',
    'B002Q6XUE4',
    'B00DXKJ2DA',
    'B07M82PNSX',
    'B01HSMRWNU',
    'B00AFPVOTG',
  ];
  const len = urls.length;

  const books = (
    await Promise.allSettled(
      [...Array(len)].map(async (_, i) => {
        const page = await browser.newPage();
        await page.goto(`${baseURL}/${urls[i]}`);
        let data = await page.evaluate(() => {
          let title = document.getElementById('productTitle').innerText;
          let price = document
            .querySelector('li.swatchElement.selected span.a-color-price')
            .innerText.replace(/[^0-9]/g, '');

          return {
            title,
            price,
          };
        });
        return data;
      })
    )
  )
    .filter((e) => e.status === 'fulfilled')
    .map((e) => e.value);
  console.log(books);
  await browser.close();
})();

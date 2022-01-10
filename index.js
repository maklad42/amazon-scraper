const puppeteer = require('puppeteer');
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');

// const url =
//   'https://www.amazon.co.jp/%E3%82%BD%E3%83%8B%E3%83%BC-%E3%83%AF%E3%82%A4%E3%83%A4%E3%83%AC%E3%82%B9%E3%83%8E%E3%82%A4%E3%82%BA%E3%82%AD%E3%83%A3%E3%83%B3%E3%82%BB%E3%83%AA%E3%83%B3%E3%82%B0%E3%83%98%E3%83%83%E3%83%89%E3%83%9B%E3%83%B3-WH-1000XM4-Bluetooth-%E6%9C%80%E5%A4%A730%E6%99%82%E9%96%93%E9%80%A3%E7%B6%9A%E5%86%8D%E7%94%9F/dp/B08F2866Q3?th=1';

// List of individual book page URLs
const urls = [
  'https://www.amazon.co.jp/dp/B005I54882/?coliid=I3R3IRHJWQB3M6&colid=2O6CSNTML0GMQ&psc=0&ref_=gv_ov_lig_pi_dp',
  'https://www.amazon.co.jp/dp/B005PM3YII/?coliid=I3I66D29TJWJN&colid=2O6CSNTML0GMQ&psc=0&ref_=gv_ov_lig_pi_dp',
  'https://www.amazon.co.jp/dp/B003XNTTYY/?coliid=I1MWYPTIE1ARQ6&colid=2O6CSNTML0GMQ&psc=0&ref_=gv_ov_lig_pi_dp',
  'https://www.amazon.co.jp/dp/B091SMJLP6/?coliid=IX1QLIVKFTRSF&colid=2O6CSNTML0GMQ&psc=0&ref_=gv_ov_lig_pi_dp',
];

let books = [];

urls.forEach((url) => {
  let details = getBooksDetails(url);
  books.push(details);
});

console.log(books);

async function getBooksDetails(url) {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

  // // Book wishlist
  // let data = await page.evaluate(() => {
  //   let html = document.querySelectorAll('li.g-item-sortable');
  //   const books = Array.from(html);

  //   return books;

  // Individual book page (test)
  let data = await page.evaluate(() => {
    let title = document.getElementById('productTitle').innerText;
    let price = document
      .querySelector('li.swatchElement.selected span.a-color-price')
      .innerText.replace(/[^0-9]/g, '');

    // let price = 0;

    return {
      title,
      price,
    };
  });

  console.log(data);

  // let html = await page.evaluate(() => document.body.innerHTML);
  // console.log(html);

  await browser.close();
}

const puppeteer = require('puppeteer');
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');

// ToDo: set up cron job
// ToDo: save result to a

// List of individual book page URLs
const urls = [
  'https://www.amazon.co.jp/dp/B005I54882/?coliid=I3R3IRHJWQB3M6&colid=2O6CSNTML0GMQ&psc=0&ref_=gv_ov_lig_pi_dp',
  'https://www.amazon.co.jp/dp/B005PM3YII/?coliid=I3I66D29TJWJN&colid=2O6CSNTML0GMQ&psc=0&ref_=gv_ov_lig_pi_dp',
  'https://www.amazon.co.jp/dp/B003XNTTYY/?coliid=I1MWYPTIE1ARQ6&colid=2O6CSNTML0GMQ&psc=0&ref_=gv_ov_lig_pi_dp',
  'https://www.amazon.co.jp/dp/B091SMJLP6/?coliid=IX1QLIVKFTRSF&colid=2O6CSNTML0GMQ&psc=0&ref_=gv_ov_lig_pi_dp',
  'https://www.amazon.co.jp/dp/B0064CZ1XE/?coliid=I1J5MQC2L4UZK0&colid=2O6CSNTML0GMQ&psc=0&ref_=gv_ov_lig_pi_dp',
  'https://www.amazon.co.jp/dp/B00HFG1QSM/?coliid=I2JVETWD0KC7K9&colid=2O6CSNTML0GMQ&psc=0&ref_=gv_ov_lig_pi_dp',
  'https://www.amazon.co.jp/dp/B016XPPJ4W/?coliid=ISPVJ0112246S&colid=2O6CSNTML0GMQ&psc=0&ref_=gv_ov_lig_pi_dp',
  'https://www.amazon.co.jp/dp/B00HFG1QSC/?coliid=I194F28K9273LK&colid=2O6CSNTML0GMQ&psc=0&ref_=gv_ov_lig_pi_dp',
  'https://www.amazon.co.jp/dp/B004X1V1CS/?coliid=I29W8WHWU6KW7T&colid=2O6CSNTML0GMQ&psc=0&ref_=gv_ov_lig_pi_dp',
  'https://www.amazon.co.jp/dp/B08Z3D14TC/?coliid=I1ULW07M0ZUMWB&colid=2O6CSNTML0GMQ&psc=0&ref_=gv_ov_lig_pi_dp',
  'https://www.amazon.co.jp/dp/B019CGY2ZG/?coliid=I28VFSP0Q8JAKU&colid=2O6CSNTML0GMQ&psc=0&ref_=gv_ov_lig_pi_dp',
  'https://www.amazon.co.jp/dp/B08QN55X7B/?coliid=IUAKP5KE521G9&colid=2O6CSNTML0GMQ&psc=0&ref_=gv_ov_lig_pi_dp',
];

async function createBookList(urls) {
  let books = [];
  const promises = [];
  for (const url of urls) {
    promises.push(getBookDetails(url));
  }
  books = await Promise.all(promises);
  console.log(books);
  return books;
}

async function getBookDetails(url) {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

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
  browser.close();
  return data;
}

createBookList(urls);

const puppeteer = require('puppeteer');
const ch = require('cheerio');
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');

// const url =
//   'https://www.amazon.co.jp/%E3%82%BD%E3%83%8B%E3%83%BC-%E3%83%AF%E3%82%A4%E3%83%A4%E3%83%AC%E3%82%B9%E3%83%8E%E3%82%A4%E3%82%BA%E3%82%AD%E3%83%A3%E3%83%B3%E3%82%BB%E3%83%AA%E3%83%B3%E3%82%B0%E3%83%98%E3%83%83%E3%83%89%E3%83%9B%E3%83%B3-WH-1000XM4-Bluetooth-%E6%9C%80%E5%A4%A730%E6%99%82%E9%96%93%E9%80%A3%E7%B6%9A%E5%86%8D%E7%94%9F/dp/B08F2866Q3?th=1';

const url = 'https://www.amazon.co.jp/hz/wishlist/ls/2O6CSNTML0GMQ';

async function configureBrowser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  return page;
}

// li#item_I3R3IRHJWQB3M6
// span.a-text-price span.a-offscreen

async function checkPrice(page) {
  await page.reload();
  let html = await page.evaluate(() => document.body.innerHTML);
  console.log(html);

  // const $ = ch.load(html);

  // $('#item_I3R3IRHJWQB3M6', html).each(function () {
  //   let currPrice = $(this).innerHTML();
  //   console.log(currPrice);
  // });
}

async function monitor() {
  let page = await configureBrowser();
  await checkPrice(page);
}

monitor();

const puppeteer = require('puppeteer');
// const devices = require('puppeteer/DeviceDescriptors');
// const iPhone = devices['iPhone 8'];
// const urlbase = 'https://www.amazon.co.jp/hz/wishlist/ls/';
const url = 'https://www.amazon.co.jp/hz/wishlist/ls/2O6CSNTML0GMQ';

// async function getProductInfo(wishListId) {
async function getProductInfo() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const page = await initPage(browser);
    // 欲しいものリストのURLを開く
    // await page.goto(urlbase + wishListId);
    await page.goto(url);
    // スクレイピング(中身は後述)
    const list = await scrapePage(page);

    console.log(list);

    return list;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    browser.close();
  }
}

async function initPage(browser) {
  const page = await browser.newPage();
  // await page.emulate(iPhone);
  return page;
}

async function scrapePage(page) {
  return await page.evaluate(async () => {
    // スクロールでの移動距離と待機間隔ms
    const distance = 500;
    const delay = 100;
    // リストの末尾が検知されない限りループする
    while (!document.querySelector('#endOfListMarker')) {
      // 500pxずつスクロール移動して、100ミリ秒待機する
      document.scrollingElement.scrollBy(0, distance);
      await new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
    }

    // 全ての商品の表示が終わったらスクレイピングを実施
    const itemList = [{ first: 'Test' }];
    // 商品の情報のBOX単位でデータを切り出す
    // [...document.querySelectorAll('a[href^="/dp/"].a-touch-link')].forEach(
    [...document.querySelectorAll('.g-item-list')].forEach((el) => {
      // const productID = el
      //   .getAttribute('href')
      //   .split('/?coliid')[0]
      //   .replace('/dp/', '');

      // title
      // const title = el.querySelector('[id^="item_title_"]').textContent;
      const title = el.querySelector('a[href^="/dp/"]').textContent;

      // price
      let price = -1;
      // const priceEle = el.querySelector('[id^="itemPrice_"] > span');

      // const priceEle = el.querySelector('span.a-price-whole');
      // if (priceEle && priceEle.textContent) {
      //   // price = Number(priceEle.textContent.replace('￥', '').replace(',', ''));
      //   price = priceEle.textContent;
      // }

      itemList.push({
        price: price,
        title: 'Help',
        // productID: productID,
      });
    });
    return itemList;
  });
}

getProductInfo();

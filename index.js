const puppeteer = require('puppeteer');
const fs = require('fs');

// Load the JSON file
let prices = JSON.parse(fs.readFileSync('./data/sample_220115.json'));

const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');

// ToDo: set up cron job
// ToDo: save result to a json file

// ToDo: create file to display the price changes

(async () => {
  const browser = await puppeteer.launch();
  const baseURL = 'https://www.amazon.co.jp/dp/';
  const urls = [
    'B004OEIQ5Y',
    'B07QT9QR41',
    'B01M9ASFQ3',
    'B005I54882',
    'B005PM3YII',
    'B003XNTTYY',
    'B091SMJLP6',
    // 'B0064CZ1XE',
    // 'B00HFG1QSM',
    // 'B016XPPJ4W',
    // 'B00HFG1QSC',
    // 'B004X1V1CS',
    // 'B08Z3D14TC',
    // 'B019CGY2ZG',
    // 'B08QN55X7B',
    // 'B09LMTQK6P',
    // 'B07Q85C6VX',
    // 'B00KVI76ZS',
    // 'B086V2NKW6',
    // 'B014POFNPI',
    // 'B07H33TBB2',
    // 'B07DNX4TT5',
    // 'B002VBV1S6',
    // 'B00N1RM8CM',
    // 'B07BD2B1CT',
    // 'B0776L9W8C',
    // 'B000FC0XV4',
    // 'B003P2WO5E',
    // 'B01MYEM8SZ',
    // 'B004J4XGN6',
    // 'B00316UMS0',
    // '0143129252',
    // 'B07637KVXL',
    // 'B07DBRBP7G',
    // 'B00FOVTOMA',
    // 'B005J3IEZQ',
    // 'B006I1AE92',
    // 'B00555X8OA',
    // 'B002Q6XUE4',
    // 'B00DXKJ2DA',
    // 'B07M82PNSX',
    // 'B01HSMRWNU',
    // 'B00AFPVOTG',
    // 'B00IXWEFDK',
    // 'B000JMKVCG',
    // 'B00LKWWFL4',
    // 'B00JVST6CA',
    // 'B00LOOCGB2',
    // 'B07WF972WK',
    // 'B00G1SRB6Q',
    // 'B01C9O32ZY',
    // 'B06WGNPM7V',
    // 'B005QBH2SQ',
    // 'B07N5J5FTS',
    // 'B000UZPIAW',
    // 'B0916LHL6F',
    // 'B07R5KC59C',
    // 'B075PVQ99T',
    // 'B002UXRGNO',
    // 'B00JDQEFIA',
    // 'B00CM9CJTM',
    // 'B00C69IIVG',
    // 'B00HL0MA3W',
    // 'B00M64A8UA',
    // '1473637473',
    // 'B002WE46UW',
    '0141975806',
    '0195019199',
    'B06XCCZJ4L',
    '0321965515',
    '0134494164',
    '0132350882',
    '0137081073',
    '1593279507',
    '1119038634',
  ];
  const len = urls.length;
  let dt = new Date();
  console.log(typeof dt);
  let msecs = dt.getTime();
  let yyyy = dt.getFullYear();
  let mm = dt.getMonth() + 1;
  mm = mm < 10 ? '0' + mm : mm;
  let dd = dt.getDate();
  dd = dd < 10 ? '0' + dd : dd;

  console.log(`${yyyy}/${mm}/${dd}`);

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
            title: title,
            prices: {
              date_msecs: msecs,
              date_txt: `${yyyy}/${mm}/${dd}`,
              price: price,
            },
          };
        });
        console.log(data);
        return data;
      })
    )
  )
    .filter((e) => e.status === 'fulfilled')
    .map((e) => e.value);
  console.log(books);

  // ToDo: Create a sample set of results based on the one below.

  // let results = [
  //   {
  //     title:
  //       'Digital Minimalism: Choosing a Focused Life in a Noisy World (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title: 'The Hero of Ages: Mistborn Book Three (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title: 'The Well of Ascension: Mistborn Book Two (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title: 'Jade Legacy (The Green Bone Saga Book 3) (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title:
  //       'The Art of Readable Code: Simple and Practical Techniques for Writing Better Code (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title: 'Blood of Elves (The Witcher Book 3) (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title: 'Sword of Destiny (The Witcher Book 2) (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title: 'The Last Wish: Introducing the Witcher (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title:
  //       '100 Things Every Designer Needs to Know About People (Voices That Matter) (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title:
  //       'Flux: 8 Superpowers for Thriving in Constant Change (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title: 'Grit: The Power of Passion and Perseverance (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title:
  //       'At Your Best: How to Get Time, Energy, and Priorities Working in Your Favor (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title: 'React: Up & Running (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title:
  //       'React Design Patterns and Best Practices: Design, build and deploy production-ready web applications using standard industry practices, 2nd Edition (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title:
  //       'Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title:
  //       'ReactJS by Example - Building Modern Web Applications with React (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title: 'Children of Ruin (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title: 'Children of Time (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title:
  //       'The Lies of Locke Lamora: The Gentleman Bastard Sequence, Book One (Gentleman Bastards 1) (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title: 'The Fifth Season (The Broken Earth Book 1) (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title:
  //       'The Poppy War: Tik Tok showed me this award-winning historical fantasy trilogy (The Poppy War, Book 1) (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title:
  //       'Ship of Magic (Liveship Traders Trilogy Book 1) (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title:
  //       'Eat That Frog!: 21 Great Ways to Stop Procrastinating and Get More Done in Less Time (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title:
  //       "The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses (English Edition)",
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title: "The Artist's Way: 25th Anniversary Edition ",
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title:
  //       'Digital Minimalism: Choosing a Focused Life in a Noisy World (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title:
  //       "So Good They Can't Ignore You: Why Skills Trump Passion in the Quest for Work You Love (English Edition)",
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title: 'Steve Jobs: The Exclusive Biography (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title: 'How Will You Measure Your Life? (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title: 'Thinking, Fast and Slow (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title:
  //       'Start with Why: How Great Leaders Inspire Everyone to Take Action (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title:
  //       'Our Mathematical Universe: My Quest for the Ultimate Nature of Reality (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title: 'The Body: A Guide for Occupants (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title:
  //       'Tools Of Titans: The Tactics, Routines, and Habits of Billionaires, Icons, and World-Class Performers (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  //   {
  //     title:
  //       'Finding Your Element: How to Discover Your Talents and Passions and Transform Your Life (English Edition)',
  //     prices: {
  //       date_msecs: msecs,
  //       date_txt: `${yyyy}/${mm}/${dd}`,
  //       price: Math.floor(Math.random() * 2500 + 1),
  //     },
  //   },
  // ];

  // console.log({ results });

  // ToDo: Loop over the results and add latest price data to JSON
  //       Use the 'title' as a key and save the price and date data

  prices.forEach((p) => {
    let price = books.find((o) => o.title === p.title);
    p.prices.push(price.prices);
  });

  console.log(
    prices.find(
      (o) => o.title === 'The Body: A Guide for Occupants (English Edition)'
    )
  );

  // ToDo: Save JSON file

  await browser.close();
})();

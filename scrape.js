const { chromium } = require("playwright");

const seeds = [85,86,87,88,89,90,91,92,93,94];

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url, { waitUntil: "load" });

    // Extract all numbers from all tables
    const numbers = await page.$$eval("table td", cells =>
      cells.map(cell => Number(cell.innerText)).filter(n => !isNaN(n))
    );

    const pageTotal = numbers.reduce((a, b) => a + b, 0);
    grandTotal += pageTotal;
  }

  console.log("FINAL TOTAL =", grandTotal);

  await browser.close();
}

run();

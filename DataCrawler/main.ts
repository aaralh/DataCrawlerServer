import { sqlite3 } from "./../node_modules/@types/sqlite3/index";

const https = require('https');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

interface ITicker {
  title: string;
  tickerid: number;
}

interface ICoinDataJson {
  price: number;
  volume_24h: number;
  market_cap: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
}

const obj = JSON.parse(fs.readFileSync("api_config.json", "utf8"));
const tickerList: ITicker[] = obj.tickers;
const apiUrl = obj.apiUrl;

// Init database.
initDatabase(tickerList).then(() => {
  queryData();
  setInterval(() => {
    queryData();
  }, 300000);
});




function queryData() {
  const db = new sqlite3.Database("./DataCrawler/coinData.db");

  tickerList.forEach((ticker) => {
    https.get(`${apiUrl}/${ticker.tickerid}/`, (resp) => {
      let data = "";
      // A chunk of data has been recieved.
      resp.on("data", (chunk) => {
        data += chunk;
      });
      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        const jsonData = JSON.parse(data);
        const coinData: ICoinDataJson = jsonData.data.quotes.USD;
        const query = `INSERT INTO ${ticker.title} VALUES (${coinData.price},
           ${coinData.volume_24h}, ${coinData.market_cap}, ${coinData.percent_change_1h},
            ${coinData.percent_change_24h}, ${coinData.percent_change_7d}, ${jsonData.data.last_updated});`;

        db.run(query);
        if (ticker === tickerList[tickerList.length - 1]) {
          db.close();
        }
      });
    }).on("error", (err) => {
      console.warn("Error: " + err.message);

    });
  });
}

async function initDatabase(tickers: ITicker[]): Promise<{}> {
  const db = new sqlite3.Database("./DataCrawler/coinData.db");
  return new Promise((resolve) => {
    tickers.forEach((ticker) => {
      db.run(`CREATE TABLE IF NOT EXISTS ${ticker.title}
      (price REAL, volume_24h INT, market_cap INT, percent_change_1h REAL, percent_change_24h,
         percent_change_7d REAL, timestamp INT );`);
      if (ticker === tickers[tickers.length - 1]) {
        resolve();
      }
    });
  });
}

const request = require("request");
const cheerio = require("cheerio");
const log = console.log;
function getData() {
    request("https://finance.naver.com/marketindex/exchangeDailyQuote.nhn?marketindexCd=FX_CHFKRW&page=1", function (err, res, body) {
        const $ = cheerio.load(body);
        const bodyList = $(".tbl_exchange tbody tr").map(function (i, element) {
            console.log($(element).find('td:nth-of-type(1)').text());
            console.log($(element).find('td:nth-of-type(4)').text());
        });
    });
}
getData();

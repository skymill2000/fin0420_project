const request = require('request');
var parseString = require('xml2js').parseString;

request('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109', function (error, response, body) {
  parseString(body, function(err, result){
    var parsedData = result;
    console.log(parsedData.rss.channel[0].item[0].description[0].header[0].wf[0]);
  })
});

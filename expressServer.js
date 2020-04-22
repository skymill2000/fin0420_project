//#work4 npm 에서 express 모듈 임포트 후에 대표 샘플 코드 실행
const express = require('express')
var mysql = require('mysql');

const app = express()
 
app.set('views', __dirname + '/views');
app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1q2w3e4r!',
  database : 'fintech',
  port : 3306
});
 
connection.connect();

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/test', function(req, res){
    res.render('ejsPage');
})

app.post('/getData', function(req, res){
    var data = req.body.inputData;
    console.log(data);
    console.log(req.body);
    connection.query('SELECT * FROM fintech.user WHERE name = ?', [data] , function (error, results, fields) {
      if (error) throw error;
      else {
        console.log(results)
      }
    });    
    res.json(results);
})


 
app.listen(3000)

//#work4 npm 에서 express 모듈 임포트 후에 대표 샘플 코드 실행
const express = require('express')
var mysql = require('mysql');
var request = require('request');
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

app.get('/signup', function(req, res){
  res.render('signup')
})

app.get('/authResult', function(req, res){
  var authCode = req.query.code;
  console.log(authCode);
  var option = {
    method : "POST",
    url : "https://testapi.openbanking.or.kr/oauth/2.0/token",
    headers : {
      'Content-Type' : "application/x-www-form-urlencoded; charset=UTF-8"
    },
    form : {
        code : authCode,
        client_id : 'q7kH44ThJwjpvNRg0BbJvE1yxvx5X53DKz1rNgPF',
        client_secret : 'yVT6irMr2h4ZTHzZY7sDpbvhm1nlOzr4nP7DYRVy',
        redirect_uri : 'http://localhost:3000/authResult',
        grant_type : 'authorization_code'
    }
  }
  request(option, function (error, response, body) {
    console.log(body);
  });
  
})

app.post('/getData', function(req, res){
    var data = req.body.inputData;
    var resultData;
    console.log(data);
    console.log(req.body);
    connection.query('SELECT * FROM fintech.user WHERE name = ?', [data] , function (error, results, fields) {
      if (error) throw error;
      else {
        resultData = results 
        console.log(results)
        res.json(resultData);
      }
    });    

})


 
app.listen(3000)

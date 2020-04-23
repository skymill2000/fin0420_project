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

//#work5 login page add
app.get('/login', function(req, res){
  res.render('login');
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
    var parseData = JSON.parse(body);
    res.render('resultChild',{data : parseData})
  });
})

app.post('/signup', function(req, res){
  var userName = req.body.userName
  var userEmail = req.body.userEmail
  var userPassword = req.body.userPassword
  var userAccessToken = req.body.userAccessToken
  var userRefreshToken = req.body.userRefreshToken
  var userSeqNo = req.body.userSeqNo
  console.log(userName,userPassword ,userAccessToken)
  console.log(req.body);
  var sql = "INSERT INTO `fintech`.`user`(`user_email`,`user_password`, `accesstoken`,  `refreshtoken`, `userseqno`)"+
  " VALUES (?,?,?,?,?);"
  connection.query(sql, [userEmail, userPassword, userAccessToken, userRefreshToken, userSeqNo] , function (error, results, fields) {
    if (error) throw error;
    else {
      console.log(this.sql);
      res.json(1);
    }
  });    
})


app.post('/login', function(req, res){
  var userEmail = req.body.userEmail;
  var userPassword = req.body.userPassword;
  var sql = "SELECT * FROM user WHERE user_email = ?"
  connection.query(sql, [userEmail], function(err, result){
    if(result.length == 0){
      //no member
    }
    else {
      if(userPassword == result[0].user_password){
        //jwt token 
        console.log("is member!")
      }
    }
  })
})

 
app.listen(3000)

//#work4 npm 에서 express 모듈 임포트 후에 대표 샘플 코드 실행
const express = require('express')
var mysql = require('mysql');
var request = require('request');
var jwt = require('jsonwebtoken');
var auth = require('./lib/auth')

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

app.get('/main', function(req, res){
  res.render('main');
})

app.get('/balance', function(req, res){
  res.render('balance')
})

app.get('/authTest',auth, function(req, res){
  res.json('welcome')
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
        var tokenKey = "f@i#n%tne#ckfhlafkd0102test!@#%"
        jwt.sign(
          {
              userId : result[0].id,
              userEmail : result[0].user_email
          },
          tokenKey,
          {
              expiresIn : '10d',
              issuer : 'fintech.admin',
              subject : 'user.login.info'
          },
          function(err, token){
              console.log('로그인 성공', token)
              res.json(token)
          }
        )

        console.log("is member!")
      }
    }
  })
})

app.post('/list', auth, function(req, res){
    //#work6 requsest url https://testapi.openbanking.or.kr/v2.0/user/me?user_seq_no=1100034736
    var user = req.decoded;
    console.log(user);
    var sql = "SELECT * FROM user WHERE id = ?"
    connection.query(sql,[user.userId], function(err, result){
      console.log(result);
      var option = {
        method : "GET",
        url : "https://testapi.openbanking.or.kr/v2.0/user/me",
        headers : {
          'Authorization' : 'Bearer ' + result[0].accesstoken
        },
        qs : {
          user_seq_no : result[0].userseqno
        }
      }
      request(option, function (error, response, body) {
        var parseData = JSON.parse(body);
        res.json(parseData);
      });
  
    })
})

app.post('/balance', auth, function(req, res){
  //work7 get User Data from mysql(request.decoded), 
  //balance open api calling
});
 
app.listen(3000)

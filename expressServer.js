//#work4 npm 에서 express 모듈 임포트 후에 대표 샘플 코드 실행
const express = require('express')
const app = express()
 
app.set('views', __dirname + '/views');
app.set('view engine','ejs')

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/test', function(req, res){
    res.render('ejsPage');
})


 
app.listen(3000)

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1q2w3e4r!',
  database : 'fintech',
  port : 3306
});
 
connection.connect();
 
connection.query('SELECT * FROM fintech.user', function (error, results, fields) {
  if (error) throw error;
  console.log('member list is : ', results);
});
 
connection.end();

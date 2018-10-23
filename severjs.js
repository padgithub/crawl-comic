// import thư viện express
var express = require('express');
var app = express();
// khai báo cổng chạy dịch vụ
var PORT = process.env.PORT || 3000;

// "To do API Root" sẽ được trả về khi thực hiện get request trên trang home page của ứng dụng  
 app.get('/', function(req, res) {
  res.send('To do API Root')
 });

app.listen(PORT, function() {
  console.log('Express listening on port' + PORT + '!');
});


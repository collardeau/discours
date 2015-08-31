var 
  express = require('express'),
  path = require('path');

var 
  app = express(),
  isProduction = process.env.NODE_ENV === 'production',
  port = isProduction? 8080 : 3001,
  publicPath = path.resolve(__dirname, 'public');

console.log('is production: ', isProduction); 
console.log('publicPath: ', publicPath);

app.use(express.static(publicPath));

app.listen(port, function() {
  console.log('Server running on port ' + port);
});

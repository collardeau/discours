var express = require('express'),
    path = require('path'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer(),
    app = express();

var isProduction = process.env.NODE_ENV === 'production',
    port = isProduction ? process.env.PORT : 3000,
    publicPath = path.resolve(__dirname, 'public');

console.log('is production: ', isProduction); 
console.log('publicPath: ', publicPath);

app.use(express.static(publicPath));

if(!isProduction) {
  var bundle = require('./server/bundle.js');
  bundle();

  // Any requests to localhost:3000/build is proxied to webpack-dev-server
  app.all('/build/*', function(req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });
}

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
  console.log('Could not connnect to proxy, please try again...');
});
app.listen(port, function() {
  console.log('Server running on port ' + port);
});

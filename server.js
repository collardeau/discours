var express = require('express'),
    path = require('path'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer(),
    app = express();

var isProduction = process.env.NODE_ENV === 'production',
    port = isProduction ? process.env.PORT : 3000,
    publicPath = path.resolve(__dirname, 'public');

app.use('/', express.static(publicPath));
app.use('/new/*', express.static(publicPath));
app.use('/popular/*', express.static(publicPath));
app.use('/about', express.static(publicPath));
//app.use('/build', express.static(publicPath + '/build'));

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

proxy.on('error', function(e) {
  console.log('Could not connnect to proxy, please try again...');
});

app.listen(port, function() {
  console.log('Server running on port ' + port);
});

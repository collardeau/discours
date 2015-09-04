console.log('heroku.js');
if(process.env.NPM_CONFIG_PRODUCTION) {
  console.log('inside production environment');
  var child_process = require('child_process');
  var proc = "webpack -p --config webpack.production.config.js";
  child_process.exec(proc, function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null){
      console.log('exec error: ' + error);
    }
  });
}

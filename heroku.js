if(process.env.NODE_ENV === 'production') {
  var child_proess = require('child_process');
  var proc = "webpack -p --config webpack.production.config.js";
  return child_process.exec(proc), function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null){
      console.log('exec error: ' + error);
    }
  });
}

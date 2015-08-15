const Firebase = require('firebase');
const ref = new Firebase('https://discours.firebaseio.com/');
//const moment = require('moment');

function buildPath(path){
  let p = path.slice();
  return p.reduce((prev, next) => {
    return prev.child(next);
  }, ref);
}

export function exists(loc){
  return new Promise((resolve, reject) => {
    buildPath(loc).once('value', snap => {
      if (snap.exists()){ resolve(); }
    });
  });
}

export function fetch(loc){
  return new Promise((resolve, reject) => {
    buildPath(loc).once('value', snap => {
      resolve(snap.val());
    }, err => reject(err.code));
  });
}

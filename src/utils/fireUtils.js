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

export function sync(loc, cb){
  buildPath(loc).on('child_added', snap => {
    let d = snap.val();
    d.topicId = snap.key();
    cb(d);
  });
}

export function syncByOrder(loc, order, cb){
  buildPath(loc).orderByChild(order).on('child_added', snap => {
    let d = snap.val();
    d.topicId = snap.key();
    cb(d);
  });
}

export function set(loc, data){
  buildPath(loc).set(data);
}

export function push (loc, data){
  let newRef = buildPath(loc).push(data);
  if (newRef){
    return Promise.resolve(newRef.key());
  }
}

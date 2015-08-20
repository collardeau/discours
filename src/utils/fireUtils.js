const Firebase = require('firebase');
const ref = new Firebase('https://discours.firebaseio.com/');

function buildPath(path){
  let p = path.slice();
  return p.reduce((prev, next) => {
    return prev.child(next);
  }, ref);
}

export function exists(loc){
  return new Promise((resolve, reject) => {
    buildPath(loc).once('value', snap => {
      if (snap.exists()){ resolve(true); }
      else { resolve(false); }
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

export function fetchUntil(loc, timestamp, cb){
  buildPath(loc).orderByChild('date')
  .endAt(timestamp)
  .on('child_added', snap => {
    let d = snap.val();
    d.topicId = snap.key();
    cb(d);
  });
}

export function fetchByOrder(loc, numToFetch, order, cb){
  let limit = numToFetch, i = 1, data;
  buildPath(loc).limitToLast(limit)
  .orderByChild(order)
  .on('child_added', snap => {
    if(i > limit){
      buildPath(loc).limitToLast(limit).orderByChild(order).off();
    }else {
      data = snap.val();
      data.topicId = snap.key();
      cb(data);
      i++;
    }
 });
}

export function syncSince(loc, timestamp, cb){
  buildPath(loc).orderByChild('date')
  .startAt(timestamp)
  .on('child_added', snap => {
    let d = snap.val();
    d.topicId = snap.key();
    cb(d);
  });
}

export function syncOnChange(loc, cb){
  buildPath(loc).on('child_changed', snap => {
    let d = snap.val();
    d.topicId = snap.key();
    cb(d);
  });
}

export function unsync(loc){
  buildPath(loc).off();
}

export function set(loc, data){
  const newData = {...data, date: Firebase.ServerValue.TIMESTAMP};
  buildPath(loc).set(newData);
}

export function setTime(loc){
  buildPath(loc).set(Firebase.ServerValue.TIMESTAMP);
}

export function push (loc, data){
  const newData = {...data, date: Firebase.ServerValue.TIMESTAMP};
  let newRef = buildPath(loc).push(newData);
  if (newRef){
    return Promise.resolve(newRef.key());
  }
}

export function increment(loc){
  buildPath(loc).transaction( current_value => {
    return (current_value || 0) + 1;
  }, (error, committed, snap) => {
    if (error) { console.log(error.message); }
  });
}

export function loginAnonymously(){
  return new Promise((res, rej) => {
    ref.authAnonymously((error, authData) => {
      if(error){ rej(error); }
      else{ res(authData); }
    });
  });
}

export function getAuth(){
  return ref.getAuth();
}

export function onLogout(cb){
  ref.onAuth(uid => {
    if(!uid){ cb(); }
  });
}


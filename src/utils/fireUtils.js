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
  buildPath(loc).orderByChild('stamp')
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
  buildPath(loc).orderByChild('stamp')
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
  buildPath(loc).set(data);
}

export function setWithStamp(loc, data){
  const newData = {...data, stamp: Firebase.ServerValue.TIMESTAMP};
  buildPath(loc).set(newData);
}

export function setTime(loc){
  buildPath(loc).set(Firebase.ServerValue.TIMESTAMP);
}

export function setEmpty(loc){
  buildPath(loc).set(null);
}

export function pushWithStamp (loc, data){
  const newData = {...data, stamp: Firebase.ServerValue.TIMESTAMP};
  let newRef = buildPath(loc).push(newData);
  if (newRef){
    return Promise.resolve(newRef.key());
  }
}

export function push (loc, data){
  let newRef = buildPath(loc).push(data);
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

export function addVote(loc, timestamp){
  buildPath(loc).transaction( current_value => {
    return Object.assign({}, current_value, {
      stamp: timestamp,
      count: current_value ? current_value.count + 1 : 0
    });
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

export function getTimestamp(loc) {
  return new Promise((res, rej) => {
    let ref = buildPath(loc);
    // on disconnect?
    ref.set(Firebase.ServerValue.TIMESTAMP, err => {
      if (err) { rej(err); }
      else {
        ref.once('value', snap => {
          res(snap.val());
        });
      }
    });
  });
}

export function createRecord(data) {
  getTimestamp(data, timestamp => {
    //data.timestamp = timestamp;
    console.log('creating record', data); 
    console.log(timestamp); 
    //let countRef = ref.child('replies...').push(data, err => {
    //  if(err) { console.log(err); }
    //  else {
    //    next(countRef.name(), timestamp);
    //  }
    //});
    //ref.onDisconnnect().remove();
  });
}

export function getAuth(){
  return ref.getAuth();
}

export function onLogin(cb){
  ref.onAuth(auth => {
    cb(auth);
  });
}


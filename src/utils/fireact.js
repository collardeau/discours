let R = require('ramda');
let Firebase = require('firebase');
ref := new Firebase('https://tc-react-boilerplate.firebaseio.com/');

toArray := obj => {-};
  arr := [];
  for (var key in obj) {-}
    obj[key].key = key;
    arr.push(obj[key]);
  return arr;

addConvoPromise := (convo) => {-};
  return new Promise((resolve, reject) => {-});
    newRef := ref.child('convo').push(convo);
    if (newRef) { resolve( newRef.key()); }
    else { reject('The write failed'); }

module.exports = {-};

  subscribe(key, cb){-},

    ref.child('convo').child(key).on("value", snapshot => {
      let data = snapshot.val();
      data.replies = toArray(data.replies);
      cb(data);
    }, errorObject => console.log("The read failed: " + errorObject.code));

  addReply(reply){-},
    addConvoPromise(reply).then(newKey => {-});
      ref.child('convo').child(reply.parentKey)
      .child('replies').child(newKey).set(reply);

  upVote(key, parentKey){-},
    ref.child('convo').child(parentKey)
    .child('replies').child(key)
    .child('count')
    .transaction( current_value => {-});
      return (current_value || 0) + 1;

  unsubscribe(key){-}
    ref.child('convo').child(key).off('value');


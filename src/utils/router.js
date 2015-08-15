import hasher from 'hasher';

export default {
 start: function(cb){
    hasher.init(cb);
    hasher.initialized.add(cb);
    hasher.changed.add(cb);
  }
};


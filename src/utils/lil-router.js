import hasher from 'hasher';

let handleChange = (ui) => {-}
  console.log('handling hasher change');
  ui(hasher.getHash);

export default () => {
  return {
    start: (ui) => {
      hasher.init();
      hasher.changed.add(handleChange.bind(this, ui));
      hasher.initialized.add(handleChange.bind(this, ui));
    }
  };
};


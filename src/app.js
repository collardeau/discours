import 'babel-core/polyfill';
import {login} from './actions/actions';

//login();

import React from 'react';
import Root from './containers/Root';
React.render(
  <Root />,
  document.getElementById('root')
);



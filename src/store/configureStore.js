import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../reducers/rootReducer';

const finalCreateStore = compose(
  applyMiddleware(thunk, logger),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);

export default function configureStore(){
  return finalCreateStore(reducer);
}

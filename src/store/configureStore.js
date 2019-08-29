import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';

const logger = createLogger();
// loggerを使うならこれを最後に書かなければならない
// Actionはオブジェクトでなければならない（Error: Actions must be plain objects）
// thunkを使えばActionに関数をおくこともできる
const middlewares = [thunk, logger];

// preloadStateはstateの初期値とする
export default function configureStore(pleloadState) {
  return createStore(
    rootReducer,
    pleloadState,
    // loggerを使わなければcomposeEithDevToolsで囲む必要はない
    composeWithDevTools(
      applyMiddleware(...middlewares)
    ),
  );
};

import { createStore,applyMiddleware,compose } from "redux";
import rootReducer from '@/reducers';

import {composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import mySaga from '@/saga';

const sagaMiddleware = createSagaMiddleware();

//多个中间件同时使用
// let composeEnhancers = compose(applyMiddleware(sagaMiddleware),composeWithDevTools())
let composeEnhancers = composeWithDevTools(applyMiddleware(sagaMiddleware))

let store = createStore(rootReducer,composeEnhancers);

sagaMiddleware.run(mySaga);

export default store;
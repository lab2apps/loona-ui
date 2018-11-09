import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { environment } from '../config/environment';
import { configureAxios } from '../config/configureAxios';

import { rootReducer } from './reducers/rootReducer';
import { rootSaga } from './sagas/rootSaga';

const logger = createLogger({
  predicate: () => environment.isLoggerEnabled,
});


const sagaMiddleware = createSagaMiddleware();

export const configureStore = (preloadedState = {}) => {
  const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger, sagaMiddleware));

  configureAxios(store);

  sagaMiddleware.run(rootSaga);

  return store;
};


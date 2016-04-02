import React from 'react';
import { render } from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { browserHistory, Router } from 'react-router';

// import reducers from '.config/reducers';

import AppRoutes from './config/Router';

const store = createStore(
  combineReducers({
    //...reducers,
    routing: routerReducer
  })
);

const reduxHistory = syncHistoryWithStore(browserHistory, store);

document.body.style.backgroundColor = 'black';
document.body.style.margin = 0;

render(
  <Provider store={store}>
    <Router history={reduxHistory}>{AppRoutes}</Router>
  </Provider>,
  document.getElementById('app')
);

import React from 'react';
import { render } from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { browserHistory, Router } from 'react-router';

// import reducers from '.config/reducers';
import oAuth from './reducers/oauth';
import gallery from './reducers/gallery';
import curator from './reducers/curator';
import AppRoutes from './config/Router';
import initialize from './lib/initialize';

const store = createStore(
  combineReducers({
    gallery,
    curator,
    oAuth,
    routing: routerReducer
  })
);

//Intialize the application
initialize(store.dispatch);

document.body.style.backgroundColor = 'black';
document.body.style.margin = 0;

render(
  <Provider store={store}>
    <Router history={syncHistoryWithStore(browserHistory, store)}>{AppRoutes}</Router>
  </Provider>,
  document.getElementById('app')
);

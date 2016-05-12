import React from 'react';
import { render } from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { browserHistory, Router } from 'react-router';
import promiseMiddleware from 'redux-promise';

// import reducers from '.config/reducers';
import application from './reducers/application';
import oAuth from './reducers/oauth';
import gallery from './reducers/gallery';
import curator from './reducers/curator';
import AppRoutes from './config/Router';

import { initializeMOTI } from './actions/application';

const store = createStore(
  combineReducers({
    application,
    gallery,
    curator,
    oAuth,
    routing: routerReducer
  }),
  applyMiddleware(promiseMiddleware)
);

// Initialize application
const accessToken = window.localStorage.getItem('instagramAccessToken');
initializeMOTI(accessToken)(store);

// Setup Boilerplate
document.body.style.fontFamily = '"Helvetica Neue", sans-serif';
document.body.style.backgroundColor = 'black';
document.body.style.color = 'white';
document.body.style.margin = 0;

// Start Rendering 
render(
  <Provider store={store}>
    <Router history={syncHistoryWithStore(browserHistory, store)}>{AppRoutes}</Router>
  </Provider>,
  document.getElementById('app')
);

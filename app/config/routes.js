var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;

var App = require('../components/App');
var Home = require('../components/Home');

var routes = (
  <Router history={hashHistory}>
    <Route path ='/' component={App}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
);

module.exports = routes;

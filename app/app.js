var React    = require('react'),
    ReactDOM = require('react-dom'),
    routes   = require('./config/routes');

document.body.style.backgroundColor = "black";

ReactDOM.render(routes, document.getElementById('app'));
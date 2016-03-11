var React = require('react');

var Main = React.createClass({
  render: function() {
    var mainStyle = {
      color: 'white',
      fontSize: 100,
    };

    var topRight = {
      top: 0,
      right: 0,
      position: 'fixed'
    };

    var bottomLeft = {
      bottom: 0,
      left: 0,
      position: 'fixed'
    };

    var bottomRight = {
      bottom: 0,
      right: 0,
      position: 'fixed'
    }

    return (
      <div style={mainStyle}>
        <div>M</div>
        <div style={topRight}>O</div>
        <div style={bottomLeft}>T</div>
        <div style={bottomRight}>I</div>
      </div>
    )
  }
});

module.exports = Main;
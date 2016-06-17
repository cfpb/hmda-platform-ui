var React = require('react');
var HomeLink = require('./HomeLink.jsx');

var AppContainer = React.createClass({

  getInitialState: function(){
    return {
      userName: 'Jane Doe'
    }
  },

  render: function(){
    return (
      <div className="AppContainer">
        <HomeLink/>
        {React.cloneElement(this.props.children, {userName:this.state.userName})}
      </div>
    )
  }
});

module.exports = AppContainer;

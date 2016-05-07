var React = require('react');
var UserHeading = require('./UserHeading.jsx');
var HomeLink = require('./HomeLink.jsx');

var AppContainer = React.createClass({

  getInitialState: function(){
    return {
      name: 'someUser'
    }
  },

  render: function() {
    var params = this.props.params;
    if(!params) params = {};

    return (
      <div className="AppContainer">
        <HomeLink/>
        <UserHeading year="2017" user={this.state.name}/>
        {this.props.children}
      </div>
    )
  }
});

module.exports = AppContainer;

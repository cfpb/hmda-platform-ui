var React = require('react');
var UserFiHeading = require('./UserFiHeading.jsx');

var AppContainer = React.createClass({

  getInitialState: function(){
    return {
      user: {
        name: '',
        institutions: []
      }
    }
  },

  setUser: function(user){
    this.setState({user: user});
  },

  render: function() {
    return (
      <div>
        <UserFiHeading institution={{}} year="2017" user={this.state.user}/>
        {this.props.children}
      </div>
    )
  }
});

module.exports = AppContainer;

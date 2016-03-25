var React = require('react');
var api = require('./api');
var UserSelect = require('./UserSelect.jsx');
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

  selectCallback: function(e){
    var user = e.target.value;
    var self = this;
    console.log('selecting user: ', user);
    api.getInstitutions(user, function(institutions){
      self.setUser({name: user, institutions: institutions});
    });
  },

  setUser: function(user){
    this.setState({user: user});
  },

  render: function() {
    return (
      <div>
        <UserSelect callback={this.selectCallback}/>
        <UserFiHeading institution={{}} year="2017" user={this.state.user.name}/>
        {this.props.children}
      </div>
    )
  }
});

module.exports = AppContainer;

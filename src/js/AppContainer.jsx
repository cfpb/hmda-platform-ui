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
    var params = this.props.params;
    if(!params) params = {};

    return (
      <div>
        <UserSelect callback={this.selectCallback}/>
        <UserFiHeading institution={{name: params.encodedInstitutionName}} year="2017" user={this.state.user.name}/>
        {React.cloneElement(
          this.props.children,
          {institutions: this.state.user.institutions}
         )
        }
      </div>
    )
  }
});

module.exports = AppContainer;

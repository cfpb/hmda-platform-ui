var React = require('react');
var api = require('./api');
var UserSelect = require('./UserSelect.jsx');
var UserHeading = require('./UserHeading.jsx');

var url = require('url');

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
    var selectComponent = url.parse(window.location.href).pathname === '/'
                        ? <UserSelect callback={this.selectCallback}/>
                        : null
                        ;

    return (
      <div className="container">
        {selectComponent}
        <UserHeading institution={{name: params.encodedInstitutionName}} year="2017" user={this.state.user.name}/>
        {/*clones any children added by the router in order to pass them props*/}
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

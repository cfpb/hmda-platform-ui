var React = require('react');
var UserHeading = require('./UserHeading.jsx');
var HomeLink = require('./HomeLink.jsx');

var AppContainer = React.createClass({

  getInitialState: function(){
    return {
      name: 'Jane Doe',
      institutions: [],
      institution: null
    }
  },

  render: function(){

    return (
      <div className="AppContainer">
        <HomeLink/>
        <UserHeading user={this.state.name}/>
        {React.cloneElement(this.props.children, this.state.institution?{institution:this.state.institution}:null)}
      </div>
    )
  }
});

module.exports = AppContainer;

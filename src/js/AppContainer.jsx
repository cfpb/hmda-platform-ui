var React = require('react');
var UserHeading = require('./UserHeading.jsx');
var HomeLink = require('./HomeLink.jsx');

var AppContainer = React.createClass({

  getInitialState: function(){
    return {
      name: '',
      institutions: [],
      institution: null
    }
  },

  render: function(){
    var params = this.props.params || {};

    return (
      <div className="AppContainer">
        <HomeLink year={params.year}/>
        <UserHeading year={params.year} user={this.state.name}/>
        {React.cloneElement(this.props.children, this.state.institution?{institution:this.state.institution}:null)}
      </div>
    )
  }
});

module.exports = AppContainer;

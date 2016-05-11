var React = require('react');
var UserHeading = require('./UserHeading.jsx');
var HomeLink = require('./HomeLink.jsx');

var AppContainer = React.createClass({

  getInitialState: function(){
    return {
      name: 'someUser',
      institutions: [],
      institution: null
    }
  },

  render: function(){
    var params = this.props.params;
    if(!params) params = {};

    return (
      <div className="AppContainer">
        <HomeLink year={this.props.params.year}/>
        <UserHeading year={this.props.params.year} user={this.state.name}/>
        {React.cloneElement(this.props.children, {institution:this.state.institution})}
      </div>
    )
  }
});

module.exports = AppContainer;

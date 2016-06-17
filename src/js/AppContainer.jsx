var React = require('react');
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
        {React.cloneElement(this.props.children, this.state.institution?{institution:this.state.institution}:null)}
      </div>
    )
  }
});

module.exports = AppContainer;

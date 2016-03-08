var React = require('react');

var apiLink = React.createClass({
  handleClick: function(e){
   e.preventDefault();
   this.props.callback();
  },
  render: function(){
    return <a className="apiLink" onClick={this.handleClick}>{this.props.text}</a>
  }
});

module.exports = apiLink;

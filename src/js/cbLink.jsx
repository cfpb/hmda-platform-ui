var React = require('react');

var cbLink = React.createClass({
  handleClick: function(e){
   e.preventDefault();
   this.props.callback();
  },
  render: function(){
    return <a className="cbLink" onClick={this.handleClick}>{this.props.text}</a>
  }
});

module.exports = cbLink;

var React = require('react');
var CbLink = React.createClass({
  handleClick: function(e){
   e.preventDefault();
   this.props.callback();
  },
  render: function(){
    return <a onClick={this.handleClick}>{this.props.text}</a>
  }
});

module.exports = CbLink;

var React = require('react');
var api = require('./api');

var Resubmit = React.createClass({
  propTypes: {
    options: React.PropTypes.array.isRequired,
    callback: React.PropTypes.array.isRequired
  },

  render: function(){
    return (
      <div className="Multicheck">
        {this.props.options.map(function(option, i){
           var id = Math.ceil(Math.random() * 1e17);
           return (
             <div>
               <input type="checkbox" id={id}
           )
        })}
    )
  }
});


module.exports = Resubmit;

var React = require('react');
var Resubmit = require('./Resubmit.jsx');

var refileText = 'Syntactical and validity errors require file resubmission.'
var validateText = 'Quality and macro errors must be validated before continuing.'
var RefileWarning = React.createClass({
 //mock link for now
 //get the divs in place for the warning and for no errors
 //hook submission stuff up later
 //and data stuff 
  getText: function(){
    var textToRender = null;
    if(this.props.code === 6){
      textToRender = refileText;
    }else if(this.props.code === 7){
      textToRender = validateText;
    }

    return <h3><span className="cf-icon cf-icon-error cf-icon__3x"></span><span className="refile-text">{textToRender}</span></h3>
  },

  refileLink: function(){
    return <a>Refile here</a>
  },

  render: function(){
    if(this.props.code > 7) return null;

    return <div className="RefileWarning">
      <div>
        
        {this.getText()}
        {this.props.code === 6 ? this.refileLink() : null}
      </div>
    </div>
  }
});

module.exports = RefileWarning;

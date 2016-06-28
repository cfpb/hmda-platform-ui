var React = require('react');
var Link = require('react-router').Link;
var api = require('./api');

var refileText = 'Syntactical and validity edits require file resubmission.'
var validateText = 'Quality and macro edits must be validated before continuing.'

var RefileWarning = React.createClass({

  propTypes: {
    code: React.PropTypes.number
  },
  getText: function(){
    var textToRender = null;
    var refileLink = null;

    if(this.props.code === 7){
      textToRender = refileText;
      refileLink = this.getRefileLink();
    }else if(this.props.code === 8){
      textToRender = validateText;
    }

    return <h3><span className="cf-icon cf-icon-error cf-icon__3x"></span><span className="refile-text">{textToRender}{refileLink}</span></h3>
  },

  getRefileLink: function(){
    var location = api.parseLocation();
    var href = '/' + location.id + '/' + location.period + '/' + (+location.submission + 1);
    return <Link to={href}> Refile here.</Link>
  },

  render: function(){
    if(this.props.code > 8) return null;

    return <div className="RefileWarning">
      <div>
        {this.getText()}
      </div>
    </div>
  }
});

module.exports = RefileWarning;

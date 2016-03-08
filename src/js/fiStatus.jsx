var React = require('react');

var fiStatus = React.createClass({

  getInitialState: function(){
    return {
      status: 0,
      editReports: []
    }
  },

  getStartTime: function(unixTime){
    var startString = "Filing started ";
    var timeSince = Date.now() - unixTime;
    var num;
    var unit = ' minutes';

    if(timeSince < 60000) return startString + 'just now.';

    if(timeSince >= 86000000) return startString + 'on ' + new Date(unixTime).toString().split(' ').splice(1, 3).join(' ') + '.';

    if(timeSince >= 3600000){
      unit = ' hours';
      num = timeSince/3600000 >> 0
    }else{
      num = timeSince/60000 >> 0
    }

    if(num === 1) unit = unit.slice(0, -1);

    return startString + num + unit + ' ago.'
  },

  render: function(){
    return (
      <div className="fiStatus">
        <h3 className="fiStatusHeader">{this.props.name}</h3>
        <div className="fiStatusStartTime">{this.getStartTime(this.props.startTime)}</div>
      </div>
    )
  }
});

module.exports = fiStatus;

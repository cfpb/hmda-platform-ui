var React = require('react');

var Progress = React.createClass({
  propTypes: {
    progress: React.PropTypes.number,
    total: React.PropTypes.number.isRequired,
    units: React.PropTypes.string.isRequired,
    singleUnit: React.PropTypes.string,
    descriptor: React.PropTypes.string
  },

  getDefaultProps: function(){
    return {
      progress: 0,
      descriptor: ''
    }
  },

  getUnits: function(val){
    var props = this.props;
    var singleUnit = props.singleUnit || props.units.slice(0, -1);

    return val === 1 ? singleUnit : props.units;
  },

  getDescriptor: function(){
    var descriptor = this.props.descriptor;
    if(descriptor) descriptor = ' ' + descriptor;
    return descriptor;
  },

  render: function(){
    var props = this.props;
    return (
      <div className="Progress">
        <span>{props.progress + ' of ' + props.total + ' ' +
          this.getUnits(props.total) + this.getDescriptor()}</span>
      </div>
    )
  }
  });

module.exports = Progress;

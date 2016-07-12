var React = require('react');
var api = require('./api');

var Multicheck= React.createClass({
  propTypes: {
    detail: React.PropTypes.object,
    appStatus: React.PropTypes.objectOf(React.PropTypes.func).isRequired
  },

  getInitialState: function(){
    return {
      justifications: this.props.detail.justifications
    }
  },

  updateText: function(e){
    this.setState({justifications: e.target.value});
  },

  justify: function(index, e){
    var checked = e.target.checked;
    var justifications = this.state.justifications;
    var justCopy = justifications.slice();
    var detailCopy = JSON.parse(JSON.stringify(this.props.detail));

    var option = justCopy[index];
    option.selected = checked;

    detailCopy.justifications = justCopy;

    api.putEdit(detailCopy.edit, detailCopy, this.props.appStatus.set)
    this.setState({justifications: justCopy});
  },

  render: function(){
    var self = this;
    return (
      <div className="Multicheck">
        {this.state.justifications.map(function(option, i){
           var id = Math.ceil(Math.random() * 1e17);
           return (
             <div key={i}>
               <input type="checkbox" id={id} checked={option.selected} onChange={self.justify.bind(self, i)}/>
               <label htmlFor={id}>{option.text}</label>
             </div>
           )
        })
        }
      </div>
    )
  }
});


module.exports = Multicheck;

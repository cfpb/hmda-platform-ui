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

  updateText: function(index, e){
    var justifications = this.state.justifications;
    var justCopy = justifications.slice();

    var option = justCopy[index];
    option.text = e.target.value;

    this.setState({justifications: justCopy});
  },

  justify: function(index, fromTextArea, e){
    var checked = fromTextArea || e.target.checked;
    var justifications = this.state.justifications;
    var justCopy = justifications.slice();
    var detailCopy = JSON.parse(JSON.stringify(this.props.detail));

    var option = justCopy[index];
    option.selected = checked;
    if(!checked && option.label === 'Other') option.text = '';

    detailCopy.justifications = justCopy;
    this.setState({justifications: justCopy});
    if(option.label !== 'Other' || fromTextArea || !checked) api.putEdit(detailCopy.edit, detailCopy, this.props.appStatus.set)
  },

  makeTextarea: function(index){
     return <textarea onChange={this.updateText.bind(this, index)} onBlur={this.justify.bind(this, index, true)} value={this.state.justifications[index].text}/>
  },

  render: function(){
    var self = this;
    return (
      <div className="Multicheck">
        {this.state.justifications.map(function(option, i){
           var id = Math.ceil(Math.random() * 1e17);
           var otherTextarea = option.label === 'Other' && option.selected ? self.makeTextarea(i) : null;

           return (
             <div key={i}>
               <input type="checkbox" id={id} checked={option.selected} onChange={self.justify.bind(self, i, false)}/>
               <label htmlFor={id}>{option.label}</label>
               {otherTextarea}
             </div>
           )
        })
        }
      </div>
    )
  }
});


module.exports = Multicheck;

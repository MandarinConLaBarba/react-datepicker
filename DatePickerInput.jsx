/** @jsx React.DOM */

var React = require('react'),
  DatePicker = require('./DatePicker.jsx');

var DatePickerInput = React.createClass({
  /**
   *
   * @returns {{date: Date}}
   */
  getDefaultProps: function() {
    return(
    {
      date : new Date(),
      dateFormatter : function(date) {
        var output = '';
        output+=date.getMonth()+1+'/';
        output+=date.getDate()+'/';
        output+=date.getFullYear();
        return output;
      },
      onChangeDate : function() {},
      classNamePrefix : "datepicker"
    });
  },
  /**
   *
   * @returns {{show: boolean}}
   */
  getInitialState: function() {
    return {show:false};
  },
  showDatePicker: function() {
    this.setState({show:true});
  },
  hideDatePicker: function() {
    this.setState({show:false});
  },
  /**
   *
   * @param {Date} date
   */
  onChangeDate: function(date) {
    this.props.date = date;
    this.setState({show:false});
    this.props.onChangeDate(date);
  },

  render: function() {
    var style = {
      position:'fixed',
      top:0,
      left:0,
      width:'100%',
      height:'100%',
      display: (this.state.show ? 'block' : 'none')
    };

    return (
      <div className={this.props.classNamePrefix + "-input"}>
        <div style={style} onClick={this.hideDatePicker}></div>
        <div className={this.props.classNamePrefix + "-wrapper"}>
          <DatePicker {...this.props} date={this.props.date} show={this.state.show} onChangeDate={this.onChangeDate} />
        </div>
        <input type="text" onFocus={this.showDatePicker} value={this.props.dateFormatter(this.props.date)} readOnly />
      </div>
      );
  }
});

module.exports = DatePickerInput;

/** @jsx React.DOM */

var React = require('react'),
  Day = require('./Day.jsx'),
  DateUtils = require('./utils/DateUtils');

var DayPicker = React.createClass(/** @lends {React.ReactComponent.prototype} */{
    /**
     *
     * @param {Date} date
     */
    selectDay: function(date) {
        this.props.selectDate(date);
    },
    render: function (){
        var pickerDate=this.props.date,
            pickerYear = pickerDate.getFullYear(),
            pickerMonth = pickerDate.getMonth(),
            pickerDay = pickerDate.getDate();

        var prevYear = pickerMonth === 0 ? pickerYear-1 : pickerYear,
            prevMonth = pickerMonth === 0 ? 11 : pickerMonth-1,
            beforeDaysCount = DateUtils.daysInMonthCount(prevMonth, prevYear),
            firstDayOfMonth = new Date(pickerYear, pickerMonth, 1),
            offset = (firstDayOfMonth.getDay()===0?7:firstDayOfMonth.getDay())- 1;
        var daysArray = DateUtils.getArrayByBoundary(beforeDaysCount-offset+1, beforeDaysCount);
        var previousMonthDays = daysArray.map(function(day){
            var prevDate = new Date(prevYear, prevMonth, day);
            return <Day key={'day-prev-mo-' + day} date={prevDate} week={1} changeDate={this.selectDay.bind(this, prevDate)} />
        }.bind(this));

        daysArray = DateUtils.getArrayByBoundary(1, DateUtils.daysInMonthCount(pickerMonth, pickerYear));
        var actualMonthDays = daysArray.map(function(day) {
            var thisDate = new Date(pickerYear, pickerMonth, day),
                weekNumber = Math.ceil((day+offset) / 7),
                selected = (this.props.selectedDate.getFullYear() === pickerYear && this.props.selectedDate.getMonth() === pickerMonth && day === pickerDay);
            return <Day key={'day-mo-' + day} selected={selected} date={thisDate} week={weekNumber} changeDate={this.selectDay.bind(this, thisDate)} />
        }.bind(this));

        var nextYear = pickerMonth === 11 ? pickerYear+1 : pickerYear,
          nextMonth = pickerMonth === 11 ? 0 : pickerMonth+1,
        daysArray = DateUtils.getArrayByBoundary(1, 42- previousMonthDays.length - actualMonthDays.length);
        var nextMonthDays = daysArray.map(function(day){
            var nextDate = new Date(nextYear, nextMonth, day),
                weekNumber = Math.ceil((previousMonthDays.length + actualMonthDays.length + day) / 7);
            return <Day key={'day-next-mo-' + day} date={nextDate} week={weekNumber} changeDate={this.selectDay.bind(this, nextDate)} />
        }.bind(this));

        return (
            <div className={this.props.classNamePrefix + "-dates"}>
                <div className="out">
                {previousMonthDays}
                </div>
                <div>
                {actualMonthDays}
                </div>
                <div className="out">
                {nextMonthDays}
                </div>
            </div>
            );
    }
});

module.exports = DayPicker;
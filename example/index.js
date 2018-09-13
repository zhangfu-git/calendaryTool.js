// import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './index.less';
import {
  getCalendarData,
  isString,
  isLegalDate,
} from '../src/main.js';

const log = console.log;

const week = ['日', '一', '二', '三', '四', '五', '六'];

class Calendar extends React.PureComponent {
  constructor(props) {
    const { value } = props;
    let date;

    super(props);
    
    if (isString(value)) {
      date = new Date(value);
    } else {
      date = value;
    }

    if (!isLegalDate(date)) date = new Date();

    this.calendarData = getCalendarData(date);

    this.state = {
      mode: 'date',
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
    };
  }
  onChange = () => {
    if (typeof this.props.onChange === 'function') {
      const { year, month, day } = this.state;
      const dateString = `${year}/${prefixZero(month + 1)}/${prefixZero(day)}`;
      this.props.onChange({
        dateString,
        date: new Date(dateString),
        year,
        month,
        day,
      });
    }
  }
  updateCalendarData = () => {
    const { year, month, day } = this.state;
    const dateString = `${year}/${month + 1}/${day}`;    
    this.calendarData = getCalendarData(dateString);
  }
  onPrevPrevMonth = () => {
    const { month, year } = this.state;
    let newMonth = month - 1;
    let newYear = year;

    if (newMonth < 0) {
      newYear -= 1;
      newMonth = 11;
    }

    this.setState({
      year: newYear,
      month: newMonth,
      day: 1,
    });
  }
  onNextMonth = () => {
    const { month, year } = this.state;
    let newMonth = month + 1;
    let newYear = year;

    if (newMonth > 11) {
      newYear += 1;
      newMonth = 0;
    }

    this.setState({
      year: newYear,
      month: newMonth,
      day: 1,
    });
  }
  onClickDay = (e) => {
    const { year, month } = this.state;

    const $day = e.target;
    const index = $day.getAttribute('data-index');
    if (!index) return;
    const { prevMonthLastDayPos, currMonthLastDayPos } = this.calendarData;

    let newYear = year;
    let newMonth = month;
    let newDay = +$day.innerText;

    if (index <= prevMonthLastDayPos) {
      newMonth -= 1;
      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }
    } else if (index > currMonthLastDayPos) {
      newMonth += 1;
      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }
    }

    this.setState({
      year: newYear,
      month: newMonth,
      day: newDay,
    });
  }
  renderDay = ({ day, index }) => {
    const currDay= this.state.day;
    const {
      currMonthLastDayPos,
      prevMonthLastDayPos,
    } = this.calendarData;

    let currMonthDay = true;
    let isToday = false;

    if (index <= prevMonthLastDayPos || index > currMonthLastDayPos) {
      currMonthDay = false;
    } else if (currDay === day) {
      isToday = true;
    }
    const dayCls = classNames({
      [styles.day]: true,
      [styles.toDay]: isToday,
      [styles.currMonthDay]: currMonthDay, 
    });

    return (
      <span data-index={index} className={dayCls}>{day}</span>
    );
  }
  renderDays = () => {
    const {
      days,
    } = this.calendarData;

    return (
      <div className={styles.days} onClick={this.onClickDay}>
        {
          days.map((item, index) => React.createElement(this.renderDay, {
            day: item,
            index,
            key: `day-${index}`,
          }))
        }
      </div>
    )
  }
  renderControlBtns = () => {
    const { y, m } = this.calendarData;
    const month = prefixZero(m + 1);

    return (
      <div className={styles.controlBox}>
        <div className={styles.prevBtn} onClick={this.onPrevPrevMonth}></div>
        <div className={styles.yearMonth}>{`${y}年${month}`}</div>
        <div className={styles.nextBtn} onClick={this.onNextMonth}></div>
      </div>
    )
  }
  renderWeek = () => {
    return (
      <div>
        {
          week.map((item) => <span className={styles.week} key={item}>{item}</span>)
        }
      </div>
    )
  }
  renderCalendar = () => {
    return (
      <div className={styles.calendar}>
        {this.renderControlBtns()}
        <div className={styles.daysWeek}>
          {this.renderWeek()}
          {this.renderDays()}
        </div>
        <div className={styles.saveBtn} onClick={this.onChange}>保存</div>
      </div>
    )
  }
  render() {
    this.updateCalendarData();
    return this.renderCalendar();
  }
}

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      result: '',
    };
  }
  handleOnChange = ({ dateString, y, m, d, date }) => {
    this.setState({
      result: dateString,
    });
  } 
  render() {
    const { result } = this.state;
    return (
      <div>
        <Calendar onChange={this.handleOnChange} />
        <h1 style={{textAlign: "center"}}>
          {
            !!result && `保存的日期: ${result}` 
          }
        </h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


function prefixZero(num) {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
}
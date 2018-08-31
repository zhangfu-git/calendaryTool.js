import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  getLastDayByPrevMonth,
} from './calendarTool.js';

const log = console.log

class Calendar extends React.Component {
  componentDidMount() {
  }
  renderCalendar() {
    console.log('dd')
  }
  render() {
    return (
      <div>日历</div>
    );
  }
}

ReactDOM.render(<Calendar />, document.getElementById('app'));
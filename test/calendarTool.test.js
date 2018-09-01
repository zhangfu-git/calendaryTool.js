import {
  getLastDayByPrevMonth,
  getLastDayByCurrMonth,
  getWeekByDate,
  getWeekByCurrMonthLastDay,
  getWeekByCurrMonthFirstDay,
  getCurrMonthDays,
  getBeforeVacancyDays,
  getAfterVacancyDays,
  getCalendarData,
} from '../src/index.js';

const assert = require('power-assert');

const date = {
  arr: ['2018/1/1', '2018/2/1', '2018/3/1', '2018/4/1', '2018/5/1', '2018/6/1', '2018/7/1', '2018/8/1', '2018/9/1', '2018/10/1', '2018/11/1', '2018/12/1'],
  value: [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30 , 31] // 2017-12 ~ 2018~12
};

describe('test/calendarTool.test.js', () => {

  it('获取上个月的最后一天', () => {
    date.arr.forEach((item, index) => {
      assert.equal(getLastDayByPrevMonth(item), date.value[index])
    });
  });

  it('获取当月的最后一天', () => {
    date.arr.forEach((item, index) => {
      assert.equal(getLastDayByCurrMonth(new Date(item)), date.value[index+1])
    });
  });

  it('获取某天为星期几', () => {
    assert.equal(getWeekByDate(2018, 8, 31), 5);

    assert.equal(getWeekByDate(2018, 9, 1), 6);

    assert.equal(getWeekByDate(2018, 10, 1), 1);
  });


  it('获得当前月份，最后一天是星期几', () => {
    assert.equal(getWeekByCurrMonthLastDay('2018-8-1'), 5);
    assert.equal(getWeekByCurrMonthLastDay('2018-8-31'), 5);
    assert.equal(getWeekByCurrMonthLastDay('2018-7-1'), 2);
    assert.equal(getWeekByCurrMonthLastDay('2018-9-1'), 0);
  });
  
  it('获取当前月，第一天是星期几', () => {
    assert.equal(getWeekByCurrMonthFirstDay('2018-8-1'), 3);
    assert.equal(getWeekByCurrMonthFirstDay('2018-7-3'), 0);
  });

  it('获取当前月的所有天数，数组', () => {
    let days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    assert.equal(getCurrMonthDays('2018-8-1')[0], days[0]);
    assert.equal(getCurrMonthDays('2018-8-1')[days.length-1], days[days.length-1]);
  });

  it('获取当前月的前的空缺days', () => {
    assert.equal(getBeforeVacancyDays('2018-9-1')[0], 26);
  });

  it('获取当前月的后空缺days', () => {
    assert.equal(getAfterVacancyDays('2018-9-1')[0], 1);
  });

});
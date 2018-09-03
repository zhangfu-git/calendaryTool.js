// 获取上一个月最后一天
export function getLastDayForPrevMonth(date = new Date()) {
  if (isString(date)) date = new Date(date);
  if (!isLegalDate(date)) throw 'Uncaught TypeError: not date type';

  const y = date.getFullYear();
  const m = date.getMonth();

  return getLastDay(y, m);
}

// 获取当前月份最后一天
export function getLastDayForCurrMonth(date = new Date()) {
  if (isString(date)) date = new Date(date);
  if (!isLegalDate(date)) throw 'Uncaught TypeError: not date type';
  const y = date.getFullYear();
  const m = date.getMonth() + 1;

  return getLastDay(y, m);
}

// 获取某个月份的最后一天
export function getLastDay(y, m) {
  const date = new Date(y, m, 1);
  return new Date(date.getTime() - 1000 * 60 * 60 * 24).getDate();
}

/**
 * 获取指定日期， 为星期几
 * @param y {number} 年
 * @param m {number} 月 注意： 这个m是1～12月，如果用getMonth()获取的m需要+1代入计算
 * @param d {number} 日
 * 
 * 这里是根据： 基姆拉尔森计算公式: W = (d + 2 * m + 3 * (m + 1) / 5 + y + y / 4 - y / 100 + y / 400) mod 7
 */
export function getWeek(y, m, d) {
  if (isString(y + m + d)) throw 'Uncaught TypeError: arg not number type';

  const startWeek = 1;
  if (m < 3) {
    m += 12;
    --y;
  }
  return (d + startWeek + 2 * m + Math.floor(3 * (m + 1) / 5) + y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400)) % 7;
}

/**
 * 获取当前月, 最后一天是星期几
 * @return {number} 0 ~ 6 (星期日 ～ 星期六)
 * */

export function getWeekForCurrMonthLastDay(date = new Date()) {
  if (isString(date)) date = new Date(date);
  if (!isLegalDate(date)) throw 'Uncaught TypeError: not date type';

  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const currMonthLastDay = getLastDayForCurrMonth(date);
  return getWeek(y, m, currMonthLastDay);
}

/**
 * 获取当前月，第一天是星期几
*/
export function getWeekForCurrMonthFirstDay(date = new Date()) {
  if (isString(date)) date = new Date(date);
  if (!isLegalDate(date)) throw 'Uncaught TypeError: not date type';

  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  return getWeek(y, m, 1);
}

/**
 * 获取当前月份的所有天数
 * @return {array} 当前月份所有天数组成的数组
 */
export function getCurrMonthDays(date = new Date()) {
  if (isString(date)) date = new Date(date);
  if (!isLegalDate(date)) throw 'Uncaught TypeError: not date type';

  const currMonthLastDay = getLastDayForCurrMonth(date);
  let currMonthDays = [];
  for (let i = 1; i <= currMonthLastDay; i++) {
    currMonthDays.push(i);
  }
  return currMonthDays;
}

/**
 * 根据当前月的第一天为星期几，来获取日历开头的空缺位置的day
*/
export function getBeforeVacancyDays(date = new Date()) {
  if (isString(date)) date = new Date(date);
  if (!isLegalDate(date)) throw 'Uncaught TypeError: not date type';

  const currMonthFirstDayWeek = getWeekForCurrMonthFirstDay(date);
  let prevMonthLastDay = getLastDayForPrevMonth(date);
  let days = [];
  for (let i = 0; i < currMonthFirstDayWeek; i++) {
    days.push(prevMonthLastDay);
    prevMonthLastDay--;
  }
  return days.reverse();
}


/**
 * 根据当前月的最后一天为星期几， 来获取日历结尾的空缺位置的day
*/
export function getAfterVacancyDays(date = new Date()) {
  if (isString(date)) date = new Date(date);
  if (!isLegalDate(date)) throw 'Uncaught TypeError: not date type';

  const currMonthLastDayWeek = getWeekForCurrMonthLastDay(date);
  let days = [];

  for (let i = 0; i < (6 - currMonthLastDayWeek); i++) {
    days.push(i + 1);
  }
  return days;
}

/**
 * 构建日历的基本数据集合
 * @param {date格式的string类型} 请用`2018/8/30`的格式，避免兼容性问题
 * @return { object}：
 包含 {
   y,
   m,
   d,
   w,
   prevMonthVacancyDays,
   nextMonthVacancyDays,
   currDays,
 }
*/
export function getCalendarData(value = new Date()) {
  if (isString(value)) value = new Date(value);
  if (!isLegalDate(value)) throw 'Uncaught TypeError: not date type';

  const date = value;
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  const w = date.getDay();

  const prevMonthVacancyDays = getBeforeVacancyDays(date);
  const nextMonthVacancyDays = getAfterVacancyDays(date);
  const currMonthDays = getCurrMonthDays(date);

  const prevMonthLastDayPos = prevMonthVacancyDays.length - 1;
  const currMonthLastDayPos = prevMonthLastDayPos + currMonthDays.length;

  const days = [...prevMonthVacancyDays, ...currMonthDays, ...nextMonthVacancyDays];

  return {
    y,
    m,
    d,
    w,
    days,
    prevMonthVacancyDays,
    nextMonthVacancyDays,
    currMonthDays,
    currMonthLastDayPos,
    prevMonthLastDayPos,
  };
};

// 判断是否为date对象
export function isDate(date) {
  return Object.prototype.toString.call(date) === '[object Date]';
}

// 判断是否为一个合法的date对象
export function isLegalDate(date) {
  if (isDate(date)) {
    const time = date.getTime();
    if (time === time) {
      return true;
    }
  }
  return false;
}

export function isString(date) {
  return typeof date === 'string';
}
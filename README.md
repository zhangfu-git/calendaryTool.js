> 前言： 最近在搬砖的过程中，需要构建几个不同类型的日历组件。在写一个日历组件需要知道：当月有多少天、当月第一天是星期几、当月最后一天是星期几、当月第一天之前和最后一天之后的星期，如果空缺需要补全day等，这些值都是我们构建一个日历组件必须的数据。 有两个地方代码一样，那就需要提取出来封装起来。

CalendarTool 一个构建日历的工具函数集，它提供了：
```
getLastDayByPrevMonth(date) => 返回传入date上一个月最后一天 (接收一个date对象/date字符串)

getLastDayByCurrMonth(date) => 返回传入date月份最后一天 (接收一个date对象/date字符串)

getWeekByDate(y, m, d) => 返回指定日期是星期几

getWeekByCurrMonthLastDay(date)   => 返回传入date，最后一天是星期几 （接收一个date对象/date字符串)

getWeekByCurrMonthFirstDay(date)   => 返回传入date， 第一天是星期几  （接收一个date对象/date字符串)

getCurrMonthDayArray(date)        => 返回传入date，当前月份的所有day组成的数组  （接收一个date对象/date字符串)

getBeforeVacancyDays(date)        => 返回传入date， 1号之前的星期位置的空缺day数组

getAfterVacancyDays(date)         => 返回传入date， 最后一天的星期位置的空缺day数组

getCalendarData(date)             => 返回传入date， 返回当前 构建日历所需要的 { y, m, d, w, prevMonthVacancyDays, nextMonthVacancyDays, currMonthDays };
```
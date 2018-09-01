> 前言： 最近在搬砖的过程中，需要构建几个不同类型的日历组件。在写一个日历组件需要知道：当月有多少天、当月第一天是星期几、当月最后一天是星期几、当月第一天之前和最后一天之后的星期，如果空缺需要补全day等，这些值都是我们构建一个日历组件必须的数据。 有两个地方代码一样，那就需要提取出来封装起来。

CalendarTool 一个构建日历的工具函数集，它提供了：

#### 单一API： (形参：date => date对象/date字符串):
* getLastDayForPrevMonth(date)                 // 返回：指定日期的上个月的最后一天
* getLastDayForCurrMonth(date)                 // 返回： 指定日期的最后一天
* getWeek(y, m, d)                                        // 返回： 指定日期的星期值 0 ~ 6 (星期日 ～ 星期六)
* getWeekForCurrMonthLastDay(date)        // 返回：  指定日期的最后一天的星期值
* getWeekForCurrMonthFirstDay(date)        // 返回： 指定日期的第一天的星期值
* getCurrMonthDays(date)                           // 返回： 指定日期当月的所有day，类型为array
* getBeforeVacancyDays(date)                   // 返回： 指定日期第一天之前空缺day
* getAfterVacancyDays(date)                     // 返回： 指定日期最后一天之后空缺day
* isDate(date)                                           // 是否为date对象
* isLegalDate(date)                                  // 是否为合法的date对象

#### 复合型API：getCalendarData(date) 返回一个对象：
 ```
{
    y,           // 年
    m,         // 月  和getMonth()获取的结果一样，展示需要+1
    d,          // 日
    w,         // 星期  0 ~ 6 (星期日 ～ 星期六)
    days,    // 当前月要展示的所有day（包括前后空缺位置的day）， 类型：数组
    prevMonthVacancyDays,      // 当前月的前一部分空缺day
    nextMonthVacancyDays,      // 当前月的后一部分空缺day
    currMonthDays,                    // 当前月的day
    currMonthLastDaysPos,      // 当前月最后一天在日历day列表的位置
    prevMonthLastDayPos,      // 上一个最后一天在日历day列表的位置
  };
```


下面用calendarTool.js构建一个日历组件：
![效果图](https://github.com/zhangfu-git/calendaryTool.js/blob/master/demo.gif)


demo运行:
```
npm start
```
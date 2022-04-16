import React, { useMemo, FC } from 'react';
import classes from 'classnames';
import * as utils from './utils';
import {
  LeftOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from '@ant-design/icons';
import { Mode, Time } from './DatePicker';

interface Props {
  value: Date;
  onChange: (value: Date) => void;
  time: Time;
  setTime: (time: Time) => void;
  setMode: (mode: Mode) => void;
}

const Base = 60 * 60 * 1000 * 24;
const weekArr = ['日', '一', '二', '三', '四', '五', '六'];
const DatePanel: FC<Props> = (props) => {
  const { value, onChange, time, setTime, setMode } = props;
  const { getYearMonthDay, generateDate } = utils;
  const visibleDays = useMemo(() => {
    // 先获取当前的年月
    const { year, month } = getYearMonthDay(
      generateDate(time.year, time.month, 1),
    );
    // 然后例如 2018-4-20 => 2018-4-1
    const currentFirstDay = generateDate(year, month, 1);
    // 获取当前是周几，把天数往前移动几天
    const FirstDayWeek = currentFirstDay.getDay();
    const startDay = Number(currentFirstDay) - FirstDayWeek * Base;
    const arr = [];
    for (let i = 0; i < 42; i++) {
      arr.push(new Date(startDay + i * Base));
    }
    const n = 7,
      len = arr.length; //假设每行显示4个
    const lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1);
    let res = [];
    for (let i = 0; i < lineNum; i++) {
      // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
      let temp = arr.slice(i * n, i * n + n);
      res.push(temp);
    }
    return res;
  }, [time]);
  const isCurrentMonth = (date: Date) => {
    const { year, month } = getYearMonthDay(new Date(time.year, time.month, 1));
    const { year: y, month: m } = getYearMonthDay(date);
    return year === y && month === m;
  };
  const isToday = (date: Date) => {
    const { year, month, day } = getYearMonthDay(date);
    const { year: y, month: m, day: d } = getYearMonthDay(new Date());
    return year === y && month === m && day === d;
  };
  const isSelect = (date: Date) => {
    const { year, month, day } = getYearMonthDay(date);
    const { year: y, month: m, day: d } = getYearMonthDay(value);
    return year === y && month === m && day === d;
  };
  const chooseDate = (date: Date) => {
    const { year, month, day } = getYearMonthDay(date);
    onChange && onChange(date);
    setTime({ year, month, day });
  };
  const prevYear = () => {
    const d = generateDate(time.year, time.month, 1);
    d.setFullYear(d.getFullYear() - 1);
    setTime(getYearMonthDay(d));
  };
  const prevMonth = () => {
    const d = generateDate(time.year, time.month, 1);
    d.setMonth(d.getMonth() - 1);
    setTime(getYearMonthDay(d));
  };
  const nextYear = () => {
    const d = generateDate(time.year, time.month, 1);
    d.setFullYear(d.getFullYear() + 1);
    setTime(getYearMonthDay(d));
  };
  const nextMonth = () => {
    const d = generateDate(time.year, time.month, 1);
    d.setMonth(d.getMonth() + 1);
    setTime(getYearMonthDay(d));
  };
  const returnToday = () => {
    onChange(new Date());
  };
  const changeModeToMonth = () => {
    setMode('month');
  };
  const changeModeToYear = () => {
    setMode('year');
  };
  return (
    <div className={classes('g-datepicker-date-panel')}>
      <div className={classes('header')}>
        <div className="left">
          <span className="icon" onClick={prevYear}>
            <LeftOutlined />
          </span>
          <span className="icon" onClick={prevMonth}>
            <DoubleLeftOutlined />
          </span>
        </div>
        <div className="middle">
          <span className="year-and-month" onClick={changeModeToYear}>
            {time.year}年
          </span>
          <span className="year-and-month" onClick={changeModeToMonth}>
            {time.month + 1}月
          </span>
        </div>
        <div className="right">
          <span className="icon" onClick={nextMonth}>
            <DoubleRightOutlined />
          </span>
          <span className="icon" onClick={nextYear}>
            <RightOutlined />
          </span>
        </div>
      </div>
      <div className={classes('content')}>
        <div className="days">
          {weekArr.map((item) => {
            return <span className="day">{item}</span>;
          })}
        </div>
        {visibleDays.map((item, index) => {
          return (
            <div className="days" key={index.toString()}>
              {item.map((i) => {
                const { day } = utils.getYearMonthDay(i);
                return (
                  <span
                    key={day}
                    className={classes('day cell', {
                      notCurrentMonth: !isCurrentMonth(i),
                      isToday: isToday(i),
                      isSelect: isSelect(i),
                    })}
                    onClick={() => chooseDate(i)}
                    // @ts-ignore
                    key={day.toString()}
                  >
                    {day}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className={classes('footer')}>
        <span className="today" onClick={returnToday}>
          今&nbsp;日
        </span>
      </div>
    </div>
  );
};

export default DatePanel;

import React, { FC, useEffect, useMemo } from 'react';
import classes from 'classnames';
import { Mode, Time } from './DatePicker';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import * as utils from './utils';
interface Props {
  value: Date;
  time: Time;
  setTime: (time: Time) => void;
  setMode: (mode: Mode) => void;
}

const MonthList = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
];

const MonthPanel: FC<Props> = (props) => {
  const { time, setMode, setTime, value } = props;
  const { generateDate, getYearMonthDay } = utils;
  const isCurrentMonth = (num: number) => {
    const { year, month } = getYearMonthDay(
      generateDate(time.year, time.month, 1),
    );
    const { year: y1 } = getYearMonthDay(value || new Date());
    const { year: y, month: m } = getYearMonthDay(generateDate(y1, num, 1));
    return value && year === y && month === m;
  };
  const prevYear = () => {
    const d = generateDate(time.year, time.month, 1);
    d.setFullYear(d.getFullYear() - 1);
    setTime(getYearMonthDay(d));
  };
  const nextYear = () => {
    const d = generateDate(time.year, time.month, 1);
    d.setFullYear(d.getFullYear() + 1);
    setTime(getYearMonthDay(d));
  };
  const changeModeToYear = () => {
    setMode('year');
  };
  const clickMonth = (num: number) => {
    setTime(getYearMonthDay(generateDate(time.year, num, 1)));
    setMode('date');
  };
  return (
    <div className="g-datepicker-month-panel">
      <div className={classes('header')}>
        <div className="left">
          <span className="icon" onClick={prevYear}>
            <DoubleLeftOutlined />
          </span>
        </div>
        <div className="middle">
          <span className="year-and-month" onClick={changeModeToYear}>
            {time.year}年
          </span>
        </div>
        <div className="right">
          <span className="icon" onClick={nextYear}>
            <DoubleRightOutlined />
          </span>
        </div>
      </div>
      <div className={classes('content')}>
        {MonthList.map((item, index) => {
          return (
            <div className="month" key={item}>
              <span
                className={classes({
                  active: isCurrentMonth(index),
                })}
                onClick={() => {
                  clickMonth(index);
                }}
              >
                {item}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthPanel;

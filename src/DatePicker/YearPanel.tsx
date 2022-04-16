import React, { FC, useEffect, useMemo, useRef } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import classes from 'classnames';
import * as utils from './utils';
import { Mode, Time } from './DatePicker';

interface Props {
  value: Date;
  time: Time;
  setTime: (time: Time) => void;
  setMode: (mode: Mode) => void;
}

const YearPanel: FC<Props> = (props) => {
  const { time, setTime, value, setMode } = props;
  const { generateDate, getYearMonthDay } = utils;
  const isCurrentYear = (num: number) => {
    const { year } = getYearMonthDay(value);
    const { year: y } = getYearMonthDay(generateDate(num, 1, 1));
    // console.log(year, y);
    return year === y;
  };
  const visibleYear = useMemo(() => {
    const arr = [];
    const prefix = Math.floor(time.year / 10);
    for (let i = 0; i < 10; i++) {
      arr.push(prefix * 10 + i);
    }
    arr.unshift(prefix * 10 - 1);
    arr.push(prefix * 10 + 10);
    return arr;
  }, [time]);
  useEffect(() => {
    console.log(visibleYear);
  });
  const prevTenYear = () => {
    setTime({ year: time.year - 10, month: time.month, day: time.day });
  };
  const nextTenYear = () => {
    setTime({ year: time.year + 10, month: time.month, day: time.day });
  };
  const clickYear = (num: number) => {
    setTime({ year: num, month: time.month, day: time.day });
    setMode('month');
  };
  const changeModeToCentury = () => {
    setMode('century');
  };
  return (
    <div className="g-datepicker-year-panel">
      <div className="header">
        <div className="left">
          <span className="icon" onClick={prevTenYear}>
            <DoubleLeftOutlined />
          </span>
        </div>
        <div className="middle">
          <span className="year-and-month" onClick={changeModeToCentury}>
            {visibleYear[1]} - {visibleYear[10]}
          </span>
        </div>
        <div className="right">
          <span className="icon" onClick={nextTenYear}>
            <DoubleRightOutlined />
          </span>
        </div>
      </div>
      <div className="content">
        {visibleYear.map((item, index) => {
          return (
            <div className="year" key={item}>
              <span
                className={classes({
                  active: isCurrentYear(item),
                  notCurrent: index === 0 || index === visibleYear.length - 1,
                })}
                onClick={() => clickYear(item)}
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

export default YearPanel;

import React, { FC, useEffect, useMemo, useRef } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import classes from 'classnames';
import * as utils from './utils';
import { Mode, Time } from './DatePicker';

export interface Props {
  time: Time;
  setTime: (time: Time) => void;
  setMode: (mode: Mode) => void;
  value: Date;
}

const CenturyPanel: FC<Props> = (props) => {
  const { time, setTime, setMode, value } = props;
  const { year } = utils.getYearMonthDay(value);
  const visibleTenYear = useMemo(() => {
    const arr = [];
    const prefix = Math.floor(time.year / 100);
    for (let i = -1; i < 11; i++) {
      arr.push(`${prefix * 100 + i * 10}-${prefix * 100 + (i + 1) * 10 - 1}`);
    }
    return arr;
  }, [time]);
  const isCurrentTenYear = (item: string) => {
    const arr = item.split('-').map((v) => parseInt(v));
    return year >= arr[0] && year <= arr[1];
  };
  const prevTenYear = () => {
    setTime({ year: time.year - 100, month: time.month, day: time.day });
  };
  const nextTenYear = () => {
    setTime({ year: time.year + 100, month: time.month, day: time.day });
  };
  const chooseTenYear = (item: string) => {
    const arr = item.split('-').map((v) => parseInt(v));
    setTime({ year: arr[0], month: time.month, day: time.day });
    setMode('year');
  };

  return (
    <div className="g-datepicker-century-panel">
      <div className="header">
        <div className="left">
          <span className="icon" onClick={prevTenYear}>
            <DoubleLeftOutlined />
          </span>
        </div>
        <div className="middle">
          <span className="year-and-month">
            {`${Math.floor(time.year / 100) * 100}-${
              Math.ceil(time.year / 100) * 100 - 1
            }`}
          </span>
        </div>
        <div className="right">
          <span className="icon" onClick={nextTenYear}>
            <DoubleRightOutlined />
          </span>
        </div>
      </div>
      <div className="content">
        {visibleTenYear.map((item, index) => {
          return (
            <div className="ten-years">
              <span
                className={classes({
                  active: isCurrentTenYear(item),
                  notCurrent:
                    index === 0 || index === visibleTenYear.length - 1,
                })}
                onClick={() => chooseTenYear(item)}
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

export default CenturyPanel;

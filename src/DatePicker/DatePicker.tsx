import React, { useRef, useState, FC, useMemo } from 'react';
import classes from 'classnames';
import { useClickOutside } from '../hooks/useClickOutside';
import './DatePicker.scss';
import DatePanel from './DatePanel';
import MonthPanel from './MonthPanel';
import YearPanel from './YearPanel';
import CenturyPanel from './CenturyPanel';
import Input from '../Input/Input';
import * as utils from './utils';

interface DatePickerProps {
  value: Date;
  onChange: (value: Date) => void;
}

export type Mode = 'date' | 'month' | 'year' | 'century';

export type Time = {
  year: number;
  month: number;
  day: number;
};

const DatePicker: FC<DatePickerProps> = (props) => {
  const { value, onChange } = props;
  const { getYearMonthDay, generateDate } = utils;
  const [showContent, setShowContent] = useState(false);
  const [mode, setMode] = useState<Mode>('date');
  const [time, setTime] = useState<Time>(getYearMonthDay(value));
  const componentRef = useRef<HTMLDivElement>(null);
  const formatData = useMemo(() => {
    const { year, month, day } = getYearMonthDay(value);
    return `${year}-${month + 1}-${day}`;
  }, [value]);

  const render = () => {
    switch (mode) {
      case 'date':
        return (
          <DatePanel
            value={value}
            onChange={changeValue}
            time={time}
            setTime={setTime}
            setMode={setMode}
          />
        );
      case 'month':
        return (
          <MonthPanel
            time={time}
            setTime={setTime}
            setMode={setMode}
            value={value}
          />
        );
      case 'year':
        return (
          <YearPanel
            time={time}
            setTime={setTime}
            setMode={setMode}
            value={value}
          />
        );
      case 'century':
        return (
          <CenturyPanel
            time={time}
            setTime={setTime}
            setMode={setMode}
            value={value}
          />
        );
    }
  };

  const openDatePicker = () => {
    setMode('date');
    setShowContent(true);
    setTime(getYearMonthDay(value));
  };

  useClickOutside(componentRef, () => {
    setShowContent(false);
  });

  const changeValue = (value: Date) => {
    onChange(value);
    setShowContent(false);
  };

  return (
    <div className={classes('g-datepicker')} ref={componentRef}>
      <Input
        type="text"
        value={formatData}
        onClick={openDatePicker}
        placeholder="请输入日期"
        onChange={() => {}}
      />
      {showContent && render()}
    </div>
  );
};

export default DatePicker;

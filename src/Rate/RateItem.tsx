import React from 'react';
import classnames from 'classnames';
import { AiFillStar } from 'react-icons/ai';

interface Props {
  value: number;
  curValue: number;
  onClick: (value: number) => void;
  allowClear: boolean;
  readonly: boolean;
}

const RateItem: React.FC<Props> = (props) => {
  const { value, onClick, curValue, allowClear, readonly } = props;
  const classes = classnames('g-rate-item', {
    active: value <= curValue,
    readonly,
  });
  const handleClick = (value: number) => {
    if (readonly) return;
    if (allowClear && value === curValue) {
      onClick(0);
      return;
    }
    onClick(value);
  };
  return (
    <>
      <AiFillStar
        className={classes}
        onClick={() => {
          handleClick(value);
        }}
      />
    </>
  );
};

export default RateItem;

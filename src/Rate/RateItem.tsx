import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { AiFillStar } from 'react-icons/ai';

interface Props {
  value: number;
  curValue: number;
  onClick: (value: number) => void;
  allowClear: boolean;
  allowHalf: boolean;
  readonly: boolean;
  hoverValue: number;
  setHoverValue: (value: number) => void;
}

const RateItem: React.FC<Props> = (props) => {
  const {
    value,
    onClick,
    curValue,
    allowClear,
    readonly,
    hoverValue,
    setHoverValue,
  } = props;
  const classes = classnames('g-rate-item', {
    active: value <= curValue && hoverValue === 0,
    'g-rate-item-hover': value <= hoverValue && !readonly,
    readonly,
  });
  const handleClick = () => {
    if (readonly) return;
    if (allowClear && value === curValue) {
      onClick(0);
      return;
    }
    onClick(value);
  };
  const handleMouseEnter = () => {
    if (readonly) return;
    setHoverValue(value);
  };
  const handleMouseLeave = () => {
    setHoverValue(0);
  };
  return (
    <>
      <AiFillStar
        className={classes}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </>
  );
};

export default RateItem;

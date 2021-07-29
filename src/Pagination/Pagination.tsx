import React, { useEffect, useState } from 'react';
import './Pagination.scss';
import classnames from 'classnames';
import usePages from './usePages';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { FaEllipsisH } from 'react-icons/fa';

interface PaginationProps {
  /**
   * @description 共有多少页
   */
  totalPage: number;
  /**
   * @description 默认当前页面
   * @default     1
   */
  defaultPage?: number;
  /**
   * 页面改变时的回调函数
   */
  onChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const { totalPage, onChange, defaultPage = 1 } = props;
  const [curPage, setCurPage] = useState(defaultPage);
  const { pages } = usePages(totalPage, curPage);
  const onClickPage = (page: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPage) setCurPage(page);
  };
  useEffect(() => {
    if (onChange) onChange(curPage);
  }, [curPage]);
  return (
    <div className="g-pagination">
      <span
        className={classnames('g-pagination-nav', {
          disabled: curPage === 1,
        })}
        onClick={(e) => {
          onClickPage(curPage - 1, e);
        }}
      >
        <AiOutlineLeft className="g-icon" />
      </span>
      {pages.map((item, i) => {
        return item === '···' ? (
          <span className="g-pagination-separator" key={i}>
            <FaEllipsisH className="g-icon" />
          </span>
        ) : (
          <span
            className={classnames('g-pagination-item', {
              active: item === curPage,
            })}
            key={i}
            onClick={(e) => {
              onClickPage(item, e);
            }}
          >
            {item}
          </span>
        );
      })}
      <span
        className={classnames('g-pagination-nav', {
          disabled: curPage === totalPage,
        })}
        onClick={(e) => {
          onClickPage(curPage + 1, e);
        }}
      >
        <AiOutlineRight className="g-icon" />
      </span>
    </div>
  );
};

export default Pagination;

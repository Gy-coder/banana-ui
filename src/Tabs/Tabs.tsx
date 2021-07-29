import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import './Tabs.scss';

interface TabsProps {
  /**
   * @description 默认选中 如果不传就是第一个
   */
  defaultSelected?: ReactNode;
  /**
   * @description 当选中的title改变时触发的回调函数
   */
  onChange?: (selected: ReactNode) => void;
}

const Tabs: React.FC<TabsProps> = (props) => {
  const { children, defaultSelected, onChange } = props;
  const title = (children as Array<ReactElement>).map((child) => {
    return child.props.title;
  });
  const [selected, setSelected] = useState<ReactNode>(
    defaultSelected || title[0],
  );
  const content = (children as Array<ReactElement>).filter((child) => {
    return child.props.title === selected;
  })[0];
  const onClickTitle = (title: ReactNode) => {
    setSelected(title);
  };

  const indicator = useRef<HTMLDivElement | null>(null);
  const navWrapper = useRef<HTMLDivElement | null>(null);
  const selectItem = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { width, left } = selectItem.current!.getBoundingClientRect();
    const { left: left2 } = navWrapper.current!.getBoundingClientRect();
    indicator.current!.style.left = `${left - left2}px`;
    indicator.current!.style.width = `${width}px`;
  }, [selectItem.current]);

  useEffect(() => {
    if (onChange) onChange(selected);
  }, [selected]);
  return (
    <div className="g-tabs">
      <div className="g-tabs-nav" ref={navWrapper}>
        {title.map((t, i) => {
          return (
            <div
              className={classnames('g-tabs-nav-item', {
                selected: selected === t,
              })}
              key={i}
              onClick={() => onClickTitle(t)}
              ref={(el) => {
                if (selected === t) selectItem.current = el;
              }}
            >
              {t}
            </div>
          );
        })}
        <div className="g-tabs-nav-indicator" ref={indicator} />
      </div>
      <div className="g-tabs-content">{content}</div>
    </div>
  );
};

export default Tabs;

import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import './Popover.scss';

interface Props {
  content: React.ReactNode;
  position?: 'top' | 'left' | 'bottom' | 'right';
  trigger?: 'click' | 'hover';
}

const Popover: React.FC<Props> = (props) => {
  const { children, content, trigger = 'click', position = 'top' } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const open = () => {
    setVisible(true);
    setTimeout(() => {
      positionContent();
      document.addEventListener('click', onClickDocument);
    });
  };
  const close = () => {
    setVisible(false);
    document.removeEventListener('click', onClickDocument);
  };
  const handleClick = (e: any) => {
    if (triggerRef.current!.contains(e.target as Node)) {
      if (visible === true) {
        close();
      } else {
        open();
      }
    }
  };
  const onClickDocument = (e: any) => {
    if (
      (triggerRef.current && triggerRef.current === e.target) ||
      triggerRef.current?.contains(e.target as Node)
    ) {
      return;
    } else {
      close();
    }
  };
  const positionContent = () => {
    console.log(contentRef.current);
    let { height: height2 } = contentRef.current!.getBoundingClientRect();
    let { width, height, left, top } =
      triggerRef.current!.getBoundingClientRect();
    let positions = {
      top: {
        top: window.scrollY + top,
        left: window.scrollX + left,
      },
      bottom: {
        top: window.scrollY + top + height,
        left: window.scrollX + left,
      },
      left: {
        top: window.scrollY + top + (height - height2) / 2,
        left: window.scrollX + left,
      },
      right: {
        top: window.scrollY + top + (height - height2) / 2,
        left: window.scrollX + left + width,
      },
    };
    contentRef.current!.style.top = positions[position].top + 'px';
    contentRef.current!.style.left = positions[position].left + 'px';
  };
  useEffect(() => {
    if (trigger === 'click') {
      popoverRef.current!.addEventListener('click', handleClick);
    }
    return () => {
      if (trigger === 'click') {
        popoverRef.current!.removeEventListener('click', handleClick);
      }
    };
  });
  return (
    <div className='g-popover' ref={popoverRef}>
      <PopoverContent
        visible={visible}
        content={content}
        ref={contentRef}
        position={position}
      />
      <span className='g-popover-trigger' ref={triggerRef}>
        {children}
      </span>
    </div>
  );
};

interface contentProps {
  visible: boolean;
  content: React.ReactNode;
  position: 'top' | 'left' | 'bottom' | 'right';
}

const PopoverContent = React.forwardRef<HTMLDivElement, contentProps>(
  (props, ref) => {
    const { visible, content, position } = props;
    const html = visible ? (
      <div
        ref={ref}
        className={classnames('g-popover-content', {
          [`position-${position}`]: position,
        })}
      >
        {content}
      </div>
    ) : null;
    return ReactDOM.createPortal(html, document.body);
  },
);

export default Popover;

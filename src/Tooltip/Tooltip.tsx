import React, {
  CSSProperties,
  FC,
  forwardRef,
  ReactElement,
  useState,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
import classname from 'classnames';
import './Tooltip.scss';
import { usePosition } from './usePosition';

type placementType = 'top' | 'left' | 'right' | 'bottom';

export interface Props {
  className?: string;
  style: CSSProperties;
  content: string;
  placement?: placementType;
}

const Tooltip: FC<Props> = (props) => {
  const { children, content, placement = 'top' } = props;
  const child = React.Children.only(children);
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const handleMouseEnter = (e: MouseEvent) => {
    setVisible(true);
    const { top, left } = usePosition(
      e.currentTarget as HTMLElement,
      tooltipRef.current as HTMLElement,
      placement,
    );
    setPosition({ top, left });
  };
  const handleMouseLeave = () => {
    setVisible(false);
  };

  return (
    <>
      {React.cloneElement(child as ReactElement, {
        // @ts-ignore
        className: classname('g-tooltip-trigger', children.props.className),
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })}
      <TooltipComponent
        content={content}
        visible={visible}
        ref={tooltipRef}
        position={position}
        placement={placement}
      />
    </>
  );
};

interface TooltipComponentProps {
  content: string;
  visible: boolean;
  position: { top: number; left: number };
  placement: placementType;
}

const TooltipComponent = forwardRef<HTMLDivElement, TooltipComponentProps>(
  (props, ref) => {
    const { content, visible, position, placement } = props;
    const { top, left } = position;

    return ReactDOM.createPortal(
      <div
        className={classname('g-tooltip-text', {
          'g-tooltip-text-open': visible,
          [`g-tooltip-${placement}`]: placement,
        })}
        ref={ref}
        //@ts-ignore
        style={{
          ...(visible ? { top, left } : { top: -9999, left: -9999 }),
        }}
      >
        {content}
      </div>,
      document.body,
    );
  },
);

export default Tooltip;

// { ...(boolean?{}:{}),  ...(boolean?{}:{}), }

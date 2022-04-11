import React, { useState } from 'react';
// @ts-ignore
import { Collapse, CollapseItem } from 'banana-ui';

const Demo = () => {
  const [selected, setSelected] = useState<Array<string>>([]);
  const onChange = (newSelected: Array<string>) => setSelected(newSelected);
  console.log('selected:', selected);
  return (
    <Collapse selected={selected} onChange={onChange}>
      <CollapseItem title="标题一" name="1">
        内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1
        内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1
        内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1
        内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1
        内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1
        内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1
        内容1 内容1 内容1 内容1 内容1 内容1 内容1
      </CollapseItem>
      <CollapseItem title="标题二" name="2">
        内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1
        内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1
        内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1
        内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1
        内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1
        内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1
        内容1 内容1 内容1 内容1 内容1 内容1 内容1
      </CollapseItem>
      <CollapseItem title="标题三" name="3">
        内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1
        内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1
        内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1
        内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1
        内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1
        内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1 内容1
        内容1 内容1 内容1 内容1 内容1 内容1 内容1
      </CollapseItem>
    </Collapse>
  );
};

export default Demo;

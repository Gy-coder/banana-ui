import React, { ReactNode } from 'react';
// @ts-ignore
import { Tabs, TabsItem } from 'banana-ui';

const Demo = () => {
  return (
    <Tabs onChange={(selected: ReactNode) => console.log(selected)}>
      <TabsItem title="体育">体育</TabsItem>
      <TabsItem title="财经">财经</TabsItem>
      <TabsItem title="美食栏目">美食</TabsItem>
    </Tabs>
  );
};

export default Demo;

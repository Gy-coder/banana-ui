import React, { Component, useState } from 'react';
// @ts-ignore
import { DatePicker } from 'banana-ui';

const App = () => {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <div>
      <DatePicker value={date} onChange={(value: Date) => setDate(value)} />
    </div>
  );
};

export default App;

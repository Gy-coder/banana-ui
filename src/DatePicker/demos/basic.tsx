import React, { useEffect, useState } from 'react';
// @ts-ignore
import { DatePicker } from 'banana-ui';

const App = () => {
  const [date, setDate] = useState<Date>();
  const handleChage = (value: Date) => {
    setDate(value);
  };
  useEffect(() => {
    console.log(`你选择的日期是${date}`);
  }, [date]);
  return (
    <div>
      <DatePicker
        value={date}
        onChange={handleChage}
        placeholder="请输入你的生日"
      />
    </div>
  );
};

export default App;

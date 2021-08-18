import { useState } from 'react';

function useToggle(initialValue:boolean){
  const [expended, setExpended] = useState(initialValue);
  const handleExpend = () => {
    setExpended(!expended);
  };
  return {expended,handleExpend}
}

export {useToggle}

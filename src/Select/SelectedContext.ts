import { createContext } from 'react';

export interface SelectContextProps {
  selectedValue: string | string[];
  hightlightIndex: number;
}

export const SelectedContext = createContext<SelectContextProps>({
  selectedValue: '',
  hightlightIndex: -1,
});

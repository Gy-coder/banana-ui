import { createContext } from 'react';

export interface SelectContextProps {
  selectedValue: string | string[];
  hightlightIndex: number;
  multiple: boolean;
}

export const SelectedContext = createContext<SelectContextProps>({
  selectedValue: '',
  hightlightIndex: -1,
  multiple: false,
});

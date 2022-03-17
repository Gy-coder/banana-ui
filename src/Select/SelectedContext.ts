import { createContext } from 'react';

export interface SelectContextProps {
  selectedValue?: string;
}

export const SelectedContext = createContext<SelectContextProps>({});

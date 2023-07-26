import { ReactNode } from 'react';

interface ISimpleProps {
  children: ReactNode;
}

interface IMenuItem {
  index: number;
  label: string;
  link?: string;
  items?: IMenuItem[];
}

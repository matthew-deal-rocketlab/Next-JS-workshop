import { ReactNode } from 'react';

interface ISimpleProps {
  children: ReactNode;
}

interface IMenuItem {
  id: string;
  label: string;
  link?: string;
  items?: IMenuItem[];
}

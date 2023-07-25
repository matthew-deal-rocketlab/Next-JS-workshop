// This file contains dummy data for the app

import { IMenuItem } from '@/components/types';

export const menuItems: IMenuItem[] = [
  { index: 0, label: 'Home', link: '/' },
  { index: 1, label: 'About', link: '/about' },
  { index: 2, label: 'Services', link: '/services' },
  { index: 3, label: 'Contact', link: '/contact' },
  {
    index: 5,
    label: 'Dropdown',
    items: [
      { index: 0, label: 'Item 1', link: '/item1' },
      { index: 1, label: 'Item 2', link: '/item2' },
      { index: 2, label: 'Item 3', link: '/item3' },
    ],
  },
  {
    index: 6,
    label: 'Dropdown 2',
    items: [
      { index: 0, label: 'Item 1', link: '/item1' },
      { index: 1, label: 'Item 2', link: '/item2' },
      { index: 2, label: 'Item 3', link: '/item3' },
    ],
  },
];

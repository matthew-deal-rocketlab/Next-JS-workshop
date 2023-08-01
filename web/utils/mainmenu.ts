// This file contains dummy data for the app

import { IMenuItem } from "@/types";


export const headerMenuItems: IMenuItem[] = [
  {
    id: 'id1',
    label: 'Home',
    link: '/dashboard',
  },
  {
    id: 'id2',
    label: 'Settings',
    link: '/settings/profile',
  },
  {
    id: 'id3',
    label: 'Your sites',
    link: '/site/monitored',
  },
  {
    id: 'id4',
    label: 'Dropdown Example',
    items: [
      {
        id: '8441cada-cf6e-4da9-9b40-30973a10bb32',
        label: 'Item 1',
        link: '/item1',
      },
      {
        id: '0d60e224-e64d-47fc-b218-0b9ae936700c',
        label: 'Item 2',
        link: '/item2',
      },
      {
        id: 'ca9d497f-b211-466d-9f8d-938d76e51a14',
        label: 'Item 3',
        link: '/item3',
      },
    ],
  },
  {
    id: '9a795e59-6512-4b8e-8782-2aa232ac3a1e',
    label: 'Logout',
    link: '/login',
  },
];

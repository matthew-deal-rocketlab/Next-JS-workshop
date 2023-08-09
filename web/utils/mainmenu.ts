// This file contains dummy data for the app

import { IMenuItem } from "@/types";


export const headerMenuItems: IMenuItem[] = [
  {
    label: 'Home',
    link: '/dashboard',
  },
  {
    label: 'Settings',
    link: '/settings/profile',
  },
  {
    label: 'Collections',
    link: '/collections/default',
  },
  {
    label: 'Logout',
    link: '/login',
  },
];

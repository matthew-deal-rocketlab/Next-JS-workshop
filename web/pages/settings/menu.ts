import { IMenuItem } from "@/types";

export const menuTitle = 'Settings'

export const menu: IMenuItem[] = [
  {
    id: 'id1',
    label: 'Profile',
    link: '/settings/profile',
  },
  {
    id: 'id2',
    label: 'Billing',
    link: '/settings/billing',
  },
  {
    id: 'id3',
    label: 'Defaults',
    link: '/settings/defaults',
  }
]

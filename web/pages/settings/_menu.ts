import { IMenuItem } from "@/types";

export const menuTitle = 'Settings'

export const menu: IMenuItem[] = [
  {
    label: 'Profile',
    link: '/settings/profile',
  },
  {
    label: 'Billing',
    link: '/settings/billing',
  },
  {
    label: 'Defaults',
    link: '/settings/defaults',
  }
]

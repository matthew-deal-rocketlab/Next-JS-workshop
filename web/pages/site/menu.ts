import { IMenuItem } from "@/types";

export const menuTitle = 'Sites'

export const menu: IMenuItem[] = [
  {
    id: 'id1',
    label: 'Monitored',
    link: '/site/monitored',
  },
  {
    id: 'id2',
    label: 'Settings',
    link: '/site/settings',
  }
]

// This file contains dummy data for the app

import { IMenuItem } from '@/components/types';

export const menuItems: IMenuItem[] = [
  {
    id: 'f47a8e5c-6e04-4ca0-b98a-b9e9a3b15e19',
    label: 'Home',
    link: '/signup',
  },
  {
    id: '649dcb2d-8a2f-4e5e-9564-6a6af9a07d57',
    label: 'Profile',
    link: '/update-profile',
  },
  {
    id: '19744b1a-2654-439e-a297-b40f35ac7761',
    label: 'Dashboard',
    link: '/dashboard',
  },
  {
    id: '9a795e59-6512-4b8e-8782-2aa232ac3a1e',
    label: 'Dashboard2',
    link: '/dashboard2',
  },
  {
    id: '20d63b2c-18cc-432f-8d7d-e43e6a3677c1',
    label: 'Dropdown',
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
    id: '5e85c650-8e84-4e87-9e14-ef2a0c072620',
    label: 'Dropdown 2',

    items: [
      {
        id: 'e349d356-1975-4332-9f39-3ec1971e6bcf',
        label: 'Item 1',
        link: '/item1',
      },
      {
        id: '47fbddac-262b-4e5b-9a77-8f41b48e119b',
        label: 'Item 2',
        link: '/item2',
      },
      {
        id: '49c18139-0140-4e2d-ae86-2af2b24a17f5',
        label: 'Item 3',
        link: '/item3',
      },
    ],
  },
];

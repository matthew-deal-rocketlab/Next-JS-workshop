import { Inter, Roboto } from 'next/font/google';

// Reference: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
// Add fonts here and then add to staticTheme in theme/index.ts

// Non variable fonts need to specify weight
export const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

//Variables fonts not need to specify weight
export const inter = Inter({ subsets: ['latin'] });

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import '@/styles/globals.css';
import { defaultTheme } from '@/theme';
import { roboto } from '@/theme/fonts';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}

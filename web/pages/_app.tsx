import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import '@/styles/globals.css';
import { defaultTheme, themeStatic } from '@/theme';
import { roboto } from '@/theme/fonts';
import UiProvider from '@/context/ui-context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={{ ...defaultTheme, ...themeStatic }}>
      <main className={roboto.className}>
        <UiProvider>
          <Component {...pageProps} />
        </UiProvider>
      </main>
    </ThemeProvider>
  );
}

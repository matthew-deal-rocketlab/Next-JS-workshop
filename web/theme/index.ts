import { inter, roboto } from '@/theme/fonts';
import { DefaultTheme } from 'styled-components';

export const defaultTheme: DefaultTheme = {
  colors: {
    primary: '#508ca4',
    secondary: '#91aec1',
    tertiary: '#bfd7ea',
    error: {
      main: '#EB0014',
      light: '#fde5e7',
      dark: '#C70011',
      contrastText: '#fff',
    },
    success: {
      main: '#1DB45A',
      light: '#ccdbd5',
      dark: '#004F2D',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    warning: {
      main: '#DEA500',
      light: '#F8EDCC',
      dark: '#AB6800',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: '#29b6f6',
      light: '#d4f0fd',
      dark: '#186D93',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    titleText: 'white',
    labelText: 'white',
    bodyText: 'white',
    // neutral colors
    white: '#fff',
    black: '#000',
    dark: '#595959',
    dark2: '#353535	',
    light: '#e2e2e2',
    light2: '#f2f2f2',

    // Generated palette
    'Columbia blue': '#bfd7ea',
    'Cadet gray': '#91aec1',
    'Air Force blue': '#508ca4',
    'Sea green': '#0a8754',
    'Cal Poly green': '#004f2d',
  },
};

// Properties which usually do not change when theme is changed
export const themeStatic = {
  breakpoints: {
    small: '600px',
    mobile: '767px',
    tablet: '1023px',
    // desktop: '1024px', plus
  },
  font: {
    roboto: roboto.style.fontFamily,
    inter: inter.style.fontFamily,
  },
  fontSizes: {
    mini: '10px',
    small: '12px',
    normal: '14px',
    medium: '16px',
    large: '20px',
    xlarge: '24px',
  },
  fontWeight: {
    normal: 400,
    bold: 700,
  },
  spacing: {
    formfieldY: '5px',
    formfieldX: '10px',
  },
  zIndex: {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
  },
};

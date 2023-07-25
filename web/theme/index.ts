import { DefaultTheme } from 'styled-components';

export const defaultTheme: DefaultTheme = {
  colors: {
    primary: '#508ca4',
    secondary: '#91aec1',
    tertiary: '#bfd7ea',
    error: 'red',
    titleText: 'white',
    labelText: 'white',
    bodyText: 'white',
    // neutral colors
    white: '#fff',
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
  font: 'Arial',
  fontSizes: {
    small: '12px',
    medium: '16px',
    large: '20px',
    xlarge: '24px',
  },
  spacing: {
    formfieldY: '5px',
    formfieldX: '10px',
  },
};

import type { Preview } from '@storybook/react'
// TODO: not sure how this is working, should be importing the global.css
import '../src/app/layout'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
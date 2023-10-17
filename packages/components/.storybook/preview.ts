import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    title: 'Components/ThreeDimensionalScene',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export default preview

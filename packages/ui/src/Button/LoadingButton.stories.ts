import type { Meta, StoryObj } from '@storybook/react'

import LoadingButtonComponent from './LoadingButton'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/Button',
  component: LoadingButtonComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    loading: {
      control: { type: 'boolean' },
      description: '控制按钮是否显示加载状态'
    },
    variant: {
      control: { type: 'select' },
      options: ['text', 'filled', 'outlined'],
      description: '按钮的变体 ("text", "filled", "outlined")'
    },
    children: {
      control: { type: 'text' },
      description: '按钮上显示的内容'
    }
  }
} satisfies Meta<typeof LoadingButtonComponent>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    loading: true,
    children: 'Primary'
  }
}

export const Secondary: Story = {
  args: {
    loading: true,
    children: 'Secondary'
  }
}

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large'
  }
}

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small'
  }
}

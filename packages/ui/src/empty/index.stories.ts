import type { Meta, StoryObj } from '@storybook/react'

import { default as Empty } from '.'

const meta = {
  title: 'Example/Empty',
  component: Empty
} as Meta<typeof Empty>
export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}

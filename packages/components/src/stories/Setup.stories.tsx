import type { Meta, StoryObj } from '@storybook/react'

import { Setup } from './../../src/three-dimensional-scene/base'

const meta = {
  title: 'Example/Setup',
  component: Setup,
  tags: ['autodocs']
} as Meta<typeof Setup>
export default meta
type Story = StoryObj<typeof meta>

export const baseCanvas: Story = {
  args: {}
}

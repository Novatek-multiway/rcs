import type { Meta, StoryObj } from '@storybook/react'

import { Setup } from '../../../base'
import { Locations } from '.'

const meta = {
  title: 'Example/Locations',
  component: Locations,
  tags: ['autodocs'],
  decorators: [(Story) => <Setup>{Story()}</Setup>]
} as Meta<typeof Locations>
export default meta
type Story = StoryObj<typeof meta>

export const BasicLocations: Story = {
  args: {
    locations: [{ x: 0, y: 0, z: 0, width: 1, height: 1, depth: 1, id: '1', isFull: true }],
    locationsTexturePathMap: {
      normalMap: '/textures/goods/goods_color.png'
    }
  }
}

import type { Meta, StoryObj } from '@storybook/react'
import * as THREE from 'three'

import { Setup } from '../../base'
import MxwCar from './MxwCar'

const meta = {
  title: 'Example/MxwCar',
  component: MxwCar,
  tags: ['autodocs'],
  decorators: [(Story) => <Setup>{Story()}</Setup>]
} as Meta<typeof MxwCar>
export default meta
type Story = StoryObj<typeof meta>

export const BasicLocations: Story = {
  args: {
    hasLocations: true,
    position: new THREE.Vector3(0, 0, 0),
    radian: 0
  }
}

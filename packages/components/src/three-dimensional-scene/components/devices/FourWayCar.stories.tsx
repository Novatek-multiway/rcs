import type { Meta, StoryObj } from '@storybook/react'
import * as THREE from 'three'

import { Setup } from '../../base'
import FourWayCar from './FourWayCar'

const meta = {
  title: 'Example/FourWayCar',
  component: FourWayCar,
  tags: ['autodocs'],
  decorators: [(Story) => <Setup>{Story()}</Setup>]
} as Meta<typeof FourWayCar>
export default meta
type Story = StoryObj<typeof meta>

export const BasicLocations: Story = {
  args: {
    hasLocations: true,
    position: new THREE.Vector3(0, 0, 0)
  }
}

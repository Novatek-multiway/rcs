import type { Meta, StoryObj } from '@storybook/react'
import * as THREE from 'three'

import { Setup } from '../../base'
import ForkTruck from './ForkTruck'

const meta = {
  title: 'Example/ForkTruck',
  component: ForkTruck,
  tags: ['autodocs'],
  decorators: [(Story) => <Setup>{Story()}</Setup>]
} as Meta<typeof ForkTruck>
export default meta
type Story = StoryObj<typeof meta>

export const BasicLocations: Story = {
  args: {
    hasLocations: true,
    position: new THREE.Vector3(0, 0, 0),
    radian: 0,
    liftArmHeight: 1,
    forkArmHeight: 1
  }
}

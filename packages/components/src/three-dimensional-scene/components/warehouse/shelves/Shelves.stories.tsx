import type { Meta, StoryObj } from '@storybook/react'

import { Setup } from '../../../base'
import Shelves from './Shelves'

const meta = {
  title: 'Example/Shelves',
  component: Shelves,
  tags: ['autodocs'],
  decorators: [(Story) => <Setup>{Story()}</Setup>]
} as Meta<typeof Shelves>
export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    id: 1,
    x: 0,
    y: 1,
    z: 0,
    width: 3,
    height: 2,
    depth: 1,
    column: 1,
    layer: 1,
    row: 1
  }
}

export const Column: Story = {
  args: {
    ...Basic.args,
    column: 8
  }
}

// const Template = (args: Story) => {
//   console.log(args)
//   return (
//     <Setup>
//       <Shelves {...args} />
//     </Setup>
//   )
// }

// export const Basic = Template.bind({})

// Basic.args = {
//   id: 1,
//   x: 0,
//   y: 1,
//   z: 0,
//   width: 3,
//   height: 2,
//   depth: 1,
//   column: 1,
//   layer: 1,
//   row: 1
// }

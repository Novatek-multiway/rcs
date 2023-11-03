import { Color, ColorBox, createColor } from 'material-ui-color'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useState } from 'react'
import { Popover } from 'ui'

interface ILineColorPickerProps {
  label: string
  initialColor: string
  onConfirm?: (color: string) => void
  onChange?: (color: string) => void
}

const LineColorPicker: FC<PropsWithChildren<ILineColorPickerProps>> = (props) => {
  const { label, initialColor, onConfirm, onChange } = props
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
    onConfirm?.(color.css.backgroundColor as string)
  }
  const open = Boolean(anchorEl)

  const [color, setColor] = useState(createColor(initialColor, 'hex' as any))
  const handleChange = (newValue: Color) => {
    setColor(newValue)
    onChange?.(newValue.css.backgroundColor as string)
  }
  return (
    <div className="item">
      <span className="label">{label}</span>
      <span
        className="marker"
        style={{
          backgroundColor: color.css.backgroundColor
        }}
        onClick={handleClick}
      ></span>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <ColorBox value={color} onChange={handleChange} />
      </Popover>
    </div>
  )
}

export default memo(LineColorPicker)

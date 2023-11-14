import DeleteIcon from '@mui/icons-material/Delete'
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks'
import * as React from 'react'
import { Box, Button, ButtonProps, Menu } from 'ui'
export interface IDelButtonProps extends ButtonProps {
  delFn: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children?: React.ReactNode
}
const DelButton = (props: IDelButtonProps) => {
  const { delFn, children = '删除', ...restProps } = props
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })
  return (
    <div>
      <Button component="label" size="small" startIcon={<DeleteIcon />} {...bindTrigger(popupState)} {...restProps}>
        {children}
      </Button>
      <Menu {...bindMenu(popupState)} id="demoMenu">
        <Box sx={{ display: 'flex', px: 2, gridGap: 10 }}>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={async (e) => {
              await delFn(e)
              popupState.close()
            }}
          >
            确定
          </Button>
          <Button size="small" variant="outlined" onClick={popupState.close}>
            取消
          </Button>
        </Box>
      </Menu>
    </div>
  )
}

export default DelButton

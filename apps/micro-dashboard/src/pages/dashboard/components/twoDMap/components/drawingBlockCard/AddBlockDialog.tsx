import { ITrafficBlock } from 'apis'
import { Field, Form, Formik } from 'formik'
import { Select, TextField } from 'formik-mui'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useDictStore } from 'store'
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  styled,
  Typography
} from 'ui'

interface IAddBlockDialogProps {
  initialValue?: Omit<ITrafficBlock, 'points'>
  open?: boolean
  onClose?: () => void
  onSubmit?: (values: Omit<ITrafficBlock, 'points'>) => Promise<void>
  points?: {
    id: number
    x: number
    y: number
  }[]
}

const AddBlockDialogContent = styled(DialogContent)(() => ({
  overflowY: 'visible',
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    '& > div': {
      width: '100%'
    }
  }
}))

// 添加区块弹窗
const AddBlockDialog: FC<PropsWithChildren<IAddBlockDialogProps>> = (props) => {
  const { initialValue, open = false, points = [], onClose, onSubmit } = props
  const [internalOpen, setInternalOpen] = useState(open)
  const dicts = useDictStore((state) => state.dicts)
  const trafficBlockTypes = useMemo(() => dicts.TrafficBlockType, [dicts])

  useEffect(() => {
    setInternalOpen(open)
  }, [open])

  const handleClose: DialogProps['onClose'] = (e, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      closeInternal()
    }
  }

  const closeInternal = () => {
    setInternalOpen(false)
    onClose?.()
  }

  return (
    <Dialog open={internalOpen} onClose={handleClose} maxWidth={'xs'}>
      <DialogTitle>添加区块</DialogTitle>

      <Formik<NonNullable<IAddBlockDialogProps['initialValue']>>
        initialValues={initialValue || { type: 1, floor: 1, maxNumber: 1 }}
        onSubmit={async (values) => {
          await onSubmit?.(values)
          closeInternal()
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <>
            <AddBlockDialogContent>
              <Form>
                <Field component={Select} name="type" label="区块类型" variant="outlined">
                  {trafficBlockTypes?.map((type: any) => (
                    <MenuItem value={type.value} key={type.label}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Field>
                <Field component={TextField} name="floor" type="number" label="楼层" variant="outlined" />
                <Field component={TextField} name="maxNumber" type="number" label="限制数量" variant="outlined" />
              </Form>

              <Card sx={{ background: 'transparent', boxShadow: 'none' }}>
                <CardContent sx={{ gap: 10 }}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    区块点位
                  </Typography>
                  <Box sx={{ bgcolor: 'background.paper', position: 'relative' }}>
                    <List
                      sx={{
                        position: 'static',
                        maxHeight: 300,
                        overflowY: 'auto',
                        pt: 6
                      }}
                    >
                      <ListItem
                        sx={{
                          position: 'absolute',
                          top: 0,
                          bgcolor: 'background.paper',
                          zIndex: 1
                        }}
                        secondaryAction={<span>操作</span>}
                      >
                        <ListItemIcon>
                          <span>ID</span>
                        </ListItemIcon>
                        <ListItemText sx={{ textAlign: 'center' }} primary="X" />
                        <ListItemText sx={{ textAlign: 'center' }} primary="Y" />
                      </ListItem>
                      {points?.map((point) => (
                        <ListItem key={point.id} secondaryAction={<span></span>}>
                          <ListItemIcon>
                            <span>{point.id}</span>
                          </ListItemIcon>
                          <ListItemText sx={{ textAlign: 'center' }} primary={point.x.toFixed(2)} />
                          <ListItemText sx={{ textAlign: 'center' }} primary={point.y.toFixed(2)} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </CardContent>
              </Card>
            </AddBlockDialogContent>

            <DialogActions>
              <Button onClick={() => closeInternal()}>取消</Button>
              <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
                确定
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  )
}

export default memo(AddBlockDialog)
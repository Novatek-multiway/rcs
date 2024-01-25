import { useVoerkaI18n } from '@voerkai18n/react'
import { ITrafficBlock } from 'apis'
import { Field, Form, Formik } from 'formik'
import { fieldToTextField, TextFieldProps } from 'formik-mui'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useCallback, useMemo } from 'react'
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
  TextField,
  Typography
} from 'ui'

export interface IBlockDialogProps {
  initialValue?: Partial<Omit<ITrafficBlock, 'points'>>
  title?: string
  open?: boolean
  onClose?: () => void
  onSubmit?: (values: Omit<ITrafficBlock, 'points'>) => Promise<void>
  points?: {
    x: number
    y: number
  }[]
}

const CustomTextField = memo((props: TextFieldProps) => {
  const {
    form: { setFieldValue },
    field: { name },
    type
  } = props
  const onChange = useCallback(
    (event: any) => {
      let { value } = event.target
      if (type === 'number') value = Number(value)
      setFieldValue(name, value)
    },
    [setFieldValue, name, type]
  )

  return <TextField {...(fieldToTextField(props) as any)} onChange={onChange} />
})

const BlockDialogContent = styled(DialogContent)(() => ({
  overflowY: 'visible',
  paddingTop: '20px !important',
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
const BlockDialog: FC<PropsWithChildren<IBlockDialogProps>> = (props) => {
  const { t } = useVoerkaI18n()
  const { initialValue, title = t('新增区块信息'), open = false, points = [], onClose, onSubmit } = props
  const dicts = useDictStore((state) => state.dicts)
  const trafficBlockTypes = useMemo(() => dicts.TrafficBlockTypes, [dicts])

  const handleClose: DialogProps['onClose'] = (e, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      onClose?.()
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'xs'} sx={{}}>
      <DialogTitle>{title}</DialogTitle>

      <Formik<NonNullable<IBlockDialogProps['initialValue']>>
        initialValues={initialValue || { type: 1, floor: 1, maxNumber: 1 }}
        onSubmit={async (values) => {
          await onSubmit?.(values as Required<typeof values>)
          onClose?.()
        }}
        validate={(values) => {
          const errors: Partial<Record<keyof Omit<ITrafficBlock, 'points'>, string>> = {}
          if (!values.floor) {
            errors.floor = t('楼层不能为空')
          } else if (!values.maxNumber) {
            errors.maxNumber = t('限制数量不能为空')
          }
          return errors
        }}
      >
        {({ submitForm, isSubmitting, setFieldValue, values }) => (
          <>
            <BlockDialogContent>
              <Form>
                {/* <Field component={Select} name="type" label="区块类型" variant="outlined">
                 
                </Field> */}
                <TextField
                  inputProps={{
                    onChange: (e: any) => {
                      setFieldValue('type', e.target.value)
                    }
                  }}
                  select
                  value={values.type}
                  label={t('区块类型')}
                  variant="outlined"
                >
                  {trafficBlockTypes?.map((type: any) => (
                    <MenuItem value={type.value} key={type.label}>
                      {type.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Field component={CustomTextField} name="floor" type="number" label={t('楼层')} variant="outlined" />
                <Field
                  component={CustomTextField}
                  name="maxNumber"
                  type="number"
                  label={t('限制数量')}
                  variant="outlined"
                />
              </Form>

              <Card sx={{ boxShadow: 'none', mt: 2, bgcolor: 'transparent' }}>
                <CardContent sx={{ gap: 10 }}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {t('区块点位')}
                  </Typography>
                  <Box sx={{ position: 'relative' }}>
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
                          // bgcolor: 'background.paper',
                          zIndex: 1
                        }}
                      >
                        <ListItemIcon>
                          <span style={{ textAlign: 'center', flex: 1 }}>Index</span>
                        </ListItemIcon>
                        <ListItemText sx={{ textAlign: 'center' }} primary="X" />
                        <ListItemText sx={{ textAlign: 'center' }} primary="Y" />
                      </ListItem>
                      {points?.map((point, index) => (
                        <ListItem key={index}>
                          <ListItemIcon sx={{ textAlign: 'center' }}>
                            <span style={{ textAlign: 'center', flex: 1 }}>{index}</span>
                          </ListItemIcon>
                          <ListItemText sx={{ textAlign: 'center' }} primary={point.x.toFixed(2)} />
                          <ListItemText sx={{ textAlign: 'center' }} primary={point.y.toFixed(2)} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </CardContent>
              </Card>
            </BlockDialogContent>

            <DialogActions>
              <Button color="warning" onClick={() => onClose?.()}>
                {t('取消')}
              </Button>
              <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
                {t('确定')}
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  )
}

export default memo(BlockDialog)

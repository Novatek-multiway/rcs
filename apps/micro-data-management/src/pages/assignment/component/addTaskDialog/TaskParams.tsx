import { useAsyncEffect } from 'ahooks'
import { getControlStates } from 'apis'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useState } from 'react'
import { Autocomplete, Checkbox, FormControlLabel, Paper, TextField, Typography } from 'ui'

import { ITaskFormData } from './type'

type TTaskParams = Pick<ITaskFormData, 'vehicleId' | 'priority' | 'isAutoCompleted'>

interface ITaskParamsProps {
  taskParams: TTaskParams
  onChange?: (newTaskParams: TTaskParams, key: keyof TTaskParams) => void
}

const TaskParams: FC<PropsWithChildren<ITaskParamsProps>> = (props) => {
  const { taskParams, onChange } = props
  const [carrierOptions, setCarrierOptions] = useState<number[]>([])

  useAsyncEffect(async () => {
    const carrierRes = await getControlStates()
    const newCarrierOptions = carrierRes.data.map((item: any) => item.id)
    setCarrierOptions(newCarrierOptions)
  }, [])

  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: 2,
        gap: 2
      }}
    >
      <Typography variant="h6" fontSize={15} color={'#9ba0a6'}>
        任务参数：
      </Typography>

      <Autocomplete
        options={carrierOptions}
        getOptionLabel={(option) => option + ''}
        onChange={(_, newValue) => {
          onChange?.(
            {
              ...taskParams,
              vehicleId: newValue
            },
            'vehicleId'
          )
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="指定车辆"
            name="vehicleId"
            variant="outlined"
            size="small"
            required
            sx={{
              minWidth: 120
            }}
            value={taskParams.vehicleId}
          />
        )}
      />
      <TextField
        name="priority"
        type="number"
        label="优先级"
        variant="outlined"
        size="small"
        required
        sx={{
          minWidth: 120
        }}
        value={taskParams.priority}
        onChange={(e) => {
          onChange?.(
            {
              ...taskParams,
              priority: Number(e.target.value)
            },
            'priority'
          )
        }}
        inputProps={{
          min: 0
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={taskParams.isAutoCompleted}
            onChange={(e) => {
              onChange?.(
                {
                  ...taskParams,
                  isAutoCompleted: Boolean(e.target.checked)
                },
                'isAutoCompleted'
              )
            }}
          />
        }
        name="isAutoCompleted"
        label="是否自动结束任务"
        sx={{
          ml: 'auto',
          '.MuiFormControlLabel-label': {
            fontSize: 14
          }
        }}
      />
    </Paper>
  )
}

export default memo(TaskParams)

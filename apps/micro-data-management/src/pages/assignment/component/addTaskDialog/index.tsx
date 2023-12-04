import { Close } from '@mui/icons-material'
import dayjs from 'dayjs'
import { FC, memo, useCallback, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Paper,
  TextField
} from 'ui'
import { generateUUID } from 'utils'

import ActionPointList, { IActionPointListProps } from './ActionPointList'
import AddTaskForm, { IActionPointParamsProps } from './ActionPointParams'
import { AddTaskDialogContentWrapper } from './style'
import TaskParams from './TaskParams'
import { ITaskFormData, ITaskItem } from './type'

const AddTaskDialog: FC<{
  open: boolean
  onClose?: () => void
  onSave?: (data: any) => void
}> = ({ open, onClose = () => {}, onSave }) => {
  const [taskParams, setTaskParams] = useState<Pick<ITaskFormData, 'vehicleId' | 'priority' | 'isAutoCompleted'>>({
    vehicleId: null,
    priority: 1,
    isAutoCompleted: true
  })
  const [actionPointList, setActionPointList] = useState<
    (ITaskItem & Pick<ITaskFormData, 'vehicleId' | 'priority' | 'action'>)[]
  >([])
  const [loopCount, setLoopCount] = useState(1)
  const handleClose = useCallback<NonNullable<DialogProps['onClose']>>(
    (e, reason) => {
      if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
        onClose?.()
      }
    },
    [onClose]
  )
  const handleSubmit = useCallback<NonNullable<IActionPointParamsProps['onSubmit']>>(
    (actionPointParams) => {
      const { isAutoCompleted, vehicleId, priority } = taskParams
      const { taskPoint, param1, param2, param3, param4, id, action } = actionPointParams
      const newTask = {
        taskPoint,
        action,
        params: [param1, param2, param3, param4].join('>'),
        id,
        isAutoCompleted,
        vehicleId,
        priority
      }
      setActionPointList([...actionPointList, newTask])
    },
    [actionPointList, taskParams]
  )

  const handleMoveUp = useCallback<NonNullable<IActionPointListProps['onMoveUp']>>(
    (index) => {
      const newActionPointList = [...actionPointList]
      const movingTask = newActionPointList[index]
      newActionPointList.splice(index, 1)
      newActionPointList.splice(index - 1, 0, movingTask)

      setActionPointList(newActionPointList)
    },
    [actionPointList]
  )

  const handleDelete = useCallback<NonNullable<IActionPointListProps['onDelete']>>(
    (index) => {
      const newActionPointList = [...actionPointList]
      newActionPointList.splice(index, 1)
      setActionPointList(newActionPointList)
    },
    [actionPointList]
  )

  const handleSave = useCallback(async () => {
    const { isAutoCompleted, vehicleId, priority } = taskParams
    const taskGroupID = generateUUID()
    const taskID = generateUUID()
    const tasks = [
      {
        id: 0,
        taskCode: taskID,
        taskDirection: '',
        groupCode: taskGroupID,
        groupSeq: 1,
        areaID: 1,
        start: 0,
        goal: actionPointList.at(-1)?.taskPoint,
        type: 0,
        isAutoCompleted: isAutoCompleted,
        taskCarrier: vehicleId,
        taskChassis: 0,
        taskCarGroup: 0,
        priority: priority,
        actionPoint: actionPointList.map(({ taskPoint, id, action, params }) => ({
          wcsCode: null,
          vertexID: taskPoint,
          goodsID: '',
          axisID: id,
          action: action,
          param: params.split('>').map(Number),
          headingAngle: -1,
          actionDelay: 0,
          relevant: '',
          state: 1,
          taskCarrier: 0,
          taskChassis: 0
        })),
        description: '',
        createTime: dayjs().format(),
        state: 1,
        remark: '',
        completeTime: null
      }
    ]
    const createTaskData = {
      createTime: dayjs().format(),
      description: taskGroupID,
      hasErrorJob: false,
      id: 0,
      isCancel: false,
      isLoop: false,
      loopCompleted: false,
      loopCount,
      loopTime: 0,
      orderCode: taskGroupID,
      state: 1,
      vehicleTypes: null,
      tasks
    }
    onSave?.(createTaskData)
    setActionPointList([])
    setTaskParams({
      vehicleId: null,
      priority: 1,
      isAutoCompleted: true
    })
  }, [actionPointList, loopCount, onSave, taskParams])

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'md'}>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 0.5
        }}
      >
        <span>新增任务</span>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          padding: 0,
          background: '#434446'
        }}
      >
        <AddTaskDialogContentWrapper>
          <section className="header">
            <TaskParams taskParams={taskParams} onChange={setTaskParams} />
          </section>
          {taskParams.vehicleId && (
            <>
              <section className="content">
                <div className="task-list">
                  <ActionPointList data={actionPointList} onMoveUp={handleMoveUp} onDelete={handleDelete} />
                </div>
                <div className="add-task-form">
                  <AddTaskForm onSubmit={handleSubmit} />
                </div>
              </section>
              <section className="footer">
                <Paper
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <div className="count">
                    <span>循环次数：</span>
                    <TextField
                      type="number"
                      size="small"
                      variant="outlined"
                      sx={{
                        '.MuiInputBase-input': {
                          py: 0.5
                        }
                      }}
                      value={loopCount}
                      onChange={(e) => {
                        setLoopCount(parseInt(e.target.value))
                      }}
                    ></TextField>
                  </div>
                  <DialogActions>
                    <Button variant="contained" size="small" onClick={handleSave}>
                      保存
                    </Button>
                    <Button size="small" color="error" onClick={() => setActionPointList([])}>
                      清空
                    </Button>
                  </DialogActions>
                </Paper>
              </section>
            </>
          )}
        </AddTaskDialogContentWrapper>
      </DialogContent>
    </Dialog>
  )
}
export default memo(AddTaskDialog)

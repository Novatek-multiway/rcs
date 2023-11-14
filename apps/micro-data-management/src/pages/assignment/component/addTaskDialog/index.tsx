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

import AddTaskForm, { IAddTaskFormProps } from './AddTaskForm'
import { AddTaskDialogContentWrapper } from './style'
import TaskList, { ITaskListProps } from './TaskList'
import { ITaskFormData, ITaskItem } from './type'

const AddTaskDialog: FC<{
  open: boolean
  onClose?: () => void
  onSave?: (data: any) => void
}> = ({ open, onClose = () => {}, onSave }) => {
  const [taskList, setTaskList] = useState<(ITaskItem & Pick<ITaskFormData, 'vehicleId' | 'priority' | 'action'>)[]>([])
  const [loopCount, setLoopCount] = useState(0)
  const handleClose = useCallback<NonNullable<DialogProps['onClose']>>(
    (e, reason) => {
      if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
        onClose?.()
      }
    },
    [onClose]
  )
  const handleSubmit = useCallback<NonNullable<IAddTaskFormProps['onSubmit']>>(
    (formData) => {
      const { taskPoint, param1, param2, param3, param4, id, isAutoCompleted, vehicleId, priority, action } = formData
      const newTask = {
        taskPoint,
        action,
        params: [param1, param2, param3, param4].join('>'),
        id,
        isAutoCompleted,
        vehicleId,
        priority
      }
      setTaskList([...taskList, newTask])
    },
    [taskList]
  )

  const handleMoveUp = useCallback<NonNullable<ITaskListProps['onMoveUp']>>(
    (index) => {
      const newTaskList = [...taskList]
      const movingTask = newTaskList[index]
      newTaskList.splice(index, 1)
      newTaskList.splice(index - 1, 0, movingTask)

      setTaskList(newTaskList)
    },
    [taskList]
  )

  const handleSave = useCallback(async () => {
    console.log(taskList)
    const taskGroupID = generateUUID()
    const taskID = generateUUID()
    const tasks = taskList.map((task) => ({
      id: 0,
      taskCode: taskID,
      taskDirection: '',
      groupCode: taskGroupID,
      groupSeq: 1,
      areaID: 1,
      start: 0,
      goal: task.taskPoint,
      type: 0,
      isAutoCompleted: task.isAutoCompleted,
      taskCarrier: task.vehicleId,
      taskChassis: 0,
      taskCarGroup: 0,
      priority: task.priority,
      actionPoint: [
        {
          wcsCode: null,
          vertexID: task.taskPoint,
          goodsID: '',
          axisID: task.id,
          action: task.action,
          param: task.params.split('>').map(Number),
          headingAngle: -1,
          actionDelay: 0,
          relevant: '',
          state: 1,
          taskCarrier: 0,
          taskChassis: 0
        }
      ],
      description: '',
      createTime: dayjs().format(),
      state: 1,
      remark: '',
      completeTime: null
    }))
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
    console.log('🚀 ~ file: index.tsx ~ line 120 ~ handleSave ~ createTaskData', createTaskData)
    onSave?.(createTaskData)
  }, [taskList, loopCount, onSave])

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
          <div className="header">
            <div className="task-list">
              <TaskList data={taskList} onMoveUp={handleMoveUp} />
            </div>
            <div className="add-task-form">
              <AddTaskForm onSubmit={handleSubmit} />
            </div>
          </div>
          <div className="footer">
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
                  defaultValue={0}
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
                <Button size="small" color="error" onClick={() => setTaskList([])}>
                  清空
                </Button>
              </DialogActions>
            </Paper>
          </div>
        </AddTaskDialogContentWrapper>
      </DialogContent>
    </Dialog>
  )
}
export default memo(AddTaskDialog)

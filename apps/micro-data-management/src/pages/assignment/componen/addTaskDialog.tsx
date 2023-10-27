import * as React from "react";
import {
  BaseForm,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormikContext,
} from "ui";

const AddTaskDialog: React.FC<{
  open: boolean;
  onClose?: () => void;
}> = ({ open, onClose = () => {} }) => {
  const formRef = React.useRef<FormikContext>(null);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>添加任务</DialogTitle>
      <DialogContent>
        <BaseForm
          ref={formRef}
          schemaObject={[
            {
              name: "AreaName",
              label: "指定车辆",
              // type: "select",
            },
            {
              name: "AreaName1",
              label: "任务点",
              // type: "select",
            },
            {
              name: "AreaName2",
              label: "动作类型",
            },
            {
              name: "AreaName3",
              label: "参数1",
            },
            {
              name: "AreaName4",
              label: "参数2",
            },
            {
              name: "AreaName5",
              label: "扩展参数",
            },
            {
              name: "AreaName6",
              label: "执行次数",
            },
            {
              name: "AreaName7",
              label: "自动结束",
            },
          ]}
        ></BaseForm>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            formRef.current && formRef.current?.submitForm();
          }}
        >
          保存
        </Button>
        <Button color="warning" onClick={onClose}>
          关闭
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddTaskDialog;

import { useRequest } from "ahooks";
import { updateCarrier } from "apis";
import * as React from "react";
// import { useDictStore } from "store";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  //   FormikContext,
  MaterialForm,
  nygFormik,
  useTheme,
} from "ui";
const ConfigDialog: React.FC<{
  open: boolean;
  onClose?: () => void;
  callback?: () => void;
  rows?: Record<string, any>;
}> = ({ open, onClose = () => {}, callback, rows }) => {
  const { runAsync: run } = useRequest(updateCarrier, {
    manual: true,
  });
  const theme = useTheme();
  const formRef = React.useRef<nygFormik>(null);

  console.log(rows);

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>添加车型</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`,
        }}
      >
        <MaterialForm
          columns={1}
          ref={formRef}
          defaultValue={{ ...rows }}
          schemaObject={[
            {
              name: "id",
              label: "车辆编号",
              type: "text",
            },
            {
              name: "reHomeWaitTime",
              label: "空闲间隔",
              type: "text",
            },
            {
              name: "homePoint",
              label: "待命点",
              type: "text",
            },
            {
              name: "isAutoReHome",
              label: "是否回待命点",
              type: "checkbox",
            },
          ]}
        ></MaterialForm>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={async () => {
            await formRef.current?.submitForm();
            const { isValid, values } = formRef.current || {};
            if (isValid) {
              await run(values);
              onClose();
              callback && callback();
            }
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
export default ConfigDialog;

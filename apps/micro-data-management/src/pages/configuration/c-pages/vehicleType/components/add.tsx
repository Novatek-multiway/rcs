import { useRequest } from "ahooks";
import { CreateChassisInfos } from "apis";
import * as React from "react";
import { useDictStore } from "store";
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
const AddDialog: React.FC<{
  open: boolean;
  onClose?: () => void;
  callback?: () => void;
}> = ({ open, onClose = () => {}, callback }) => {
  const { runAsync: run } = useRequest(CreateChassisInfos, {
    manual: true,
  });
  const theme = useTheme();
  const formRef = React.useRef<nygFormik>(null);
  const { dicts } = useDictStore();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>添加车型</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`,
        }}
      >
        <MaterialForm
          ref={formRef}
          schemaObject={[
            {
              name: "Type",
              label: "类型",
              type: "select",
              required: true,
              items: dicts["CarrierType"],
              // type: "select",
            },
            {
              name: "Model",
              label: "名称",
              type: "text",
              required: true,
              // type: "select",
            },
            {
              name: "X1",
              label: "X1",
              type: "number",
              required: true,
            },
            {
              name: "X2",
              label: "X2",
              type: "number",
              required: true,
            },
            {
              name: "Y1",
              label: "Y1",
              type: "number",
              required: true,
            },
            {
              name: "Y2",
              label: "Y2",
              type: "number",
              required: true,
            },
            {
              name: "ForcedCharge",
              label: "强制充电电量",
              type: "number",
            },
            {
              name: "ChassisModel",
              label: "模型文件",
              type: "text",
            },
          ]}
        ></MaterialForm>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={async () => {
            const a = await formRef.current?.submitForm();
            console.log(a);
            const { isValid, values } = formRef.current || {};
            if (isValid) {
              const baseData = {
                BrakingAcceleration: 300,
                FreeSecond: 0,
                FullChargeDay: 7,
                ID: 0,
                IsControlFront: false,
                Length: 100,
                MaxAcc: 300,
                MaxDec: 300,
                NoLoadLength: 100,
                NoLoadOffsetX: 0,
                NoLoadOffsetY: 0,
                NoLoadRadius: 0,
                NoLoadSpeed: 3000,
                NoLoadWidth: 100,
                SafeX: 10,
                SafeY: 10,
                Shutdown: 100,
                SpeedMax: 3000,
                TimeOut: 10,
                Type: 1,
                Width: 100,
                noLoadLength: 0,
                noLoadOffsetX: 0,
                noLoadOffsetY: 0,
                noLoadWidth: 0,
              };
              const sendData = {
                ...baseData,
                ...values,
                Type: Number(values.Type),
                ForcedCharge: Number(values.ForcedCharge),
              };
              await run(sendData);
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
export default AddDialog;

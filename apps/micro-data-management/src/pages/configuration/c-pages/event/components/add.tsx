import { useRequest } from "ahooks";
import { AddEvent } from "apis";
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
  vertexData?: any;
  carrierData?: any;
  chassisList?: any;
  onClose?: () => void;
  callback?: () => void;
}> = ({
  open,
  onClose = () => {},
  callback,
  chassisList = [],
  vertexData = [],
}) => {
  const { runAsync: run } = useRequest(AddEvent, {
    manual: true,
  });
  const theme = useTheme();
  const formRef = React.useRef<nygFormik>(null);
  const { dicts } = useDictStore();
  const schemaObject = [
    {
      name: "description",
      label: "事件描述",
      type: "text",
      required: true,
      // type: "select",
    },
    {
      name: "genus",
      label: "元素类型",
      type: "select",
      items: dicts["GraphGenus"],
      // type: "select",
    },
    {
      name: "routeKey",
      label: "路径ID",
      type: "autoComplete",
      items: vertexData,
      // type: "select",
    },
    {
      name: "carrierType",
      label: "车辆类型",
      type: "select",
      items: chassisList,
    },
    {
      name: "doTime",
      label: "执行阶段",
      type: "select",
      items: dicts["EventTime"],
    },
    {
      name: "waitTime",
      label: "等待阶段",
      type: "select",
      items: dicts["EventTime"],
    },

    {
      name: "eventType",
      label: "事件类型",
      type: "select",
      items: dicts["EventType"],
    },
    {
      name: "timeOut",
      label: "超时",
      type: "number",
    },
    {
      name: "delay",
      label: "延时",
      type: "number",
    },
    {
      name: "priority",
      label: "优先级",
      type: "number",
    },
    {
      name: "checkHasGoods",
      label: "载货判断",
      type: "select",
      items: dicts["CheckGoods"],
    },
  ];

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>添加事件</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`,
        }}
      >
        <MaterialForm
          columns={3}
          ref={formRef}
          defaultValue={{}}
          schemaObject={schemaObject}
        ></MaterialForm>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={async () => {
            await formRef.current?.submitForm();
            const { isValid, values } = formRef.current;

            schemaObject.map((item) => {
              if (item.type === "select") {
                values[item.name] = Number(values[item.name]);
              }
            });
            if (isValid) {
              const sendData = {
                ...values,
                routeKey: values.routeKey.value,
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

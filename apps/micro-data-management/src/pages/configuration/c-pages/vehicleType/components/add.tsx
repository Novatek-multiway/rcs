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
}> = ({ open, onClose = () => {} }) => {
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
              type: "text",
              required: true,
            },
            {
              name: "X2",
              label: "X2",
              type: "text",
              required: true,
            },
            {
              name: "Y1",
              label: "Y1",
              type: "text",
              required: true,
            },
            {
              name: "Y2",
              label: "Y2",
              type: "text",
              required: true,
            },
            {
              name: "ForcedCharge",
              label: "强制充电电量",
              type: "text",
            },
            {
              name: "模型文件",
              label: "自动结束",
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
              console.log(values);
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

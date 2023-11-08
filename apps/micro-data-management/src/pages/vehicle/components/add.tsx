import { postCreateCarrier } from "apis";
import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MaterialForm,
  nygFormik,
  useTheme,
} from "ui";

let count = 0;
const initAry: any[] = [];
while (count < 9999) {
  count++;
  initAry.push({ label: "" + count, value: "" + count });
}

const AddDialog: React.FC<{
  open: boolean;
  onClose?: () => void;
  callback?: () => void;
}> = ({ open, onClose = () => {}, callback }) => {
  const theme = useTheme();
  const formRef = React.useRef<nygFormik>(null);

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>添加车辆配置信息</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`,
        }}
      >
        <MaterialForm
          columns={2}
          ref={formRef}
          schemaObject={[
            {
              name: "ip",
              label: "车辆IP",
              type: "text",
            },
            {
              name: "name",
              label: "车体名称",
              type: "text",
            },
            {
              name: "id",
              label: "车辆编号",
              type: "text",
            },
            {
              name: "type",
              label: "车辆类型",
              type: "text",
            },
            {
              name: "area",
              label: "车辆分组",
              type: "autoComplete",
              multiple: true,
              items: initAry,
            },
          ]}
        ></MaterialForm>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={async () => {
            await formRef?.current?.submitForm();
            const { isValid, values }: any = formRef.current || {};
            console.log(values, isValid);

            if (isValid) {
              const params = { ...values };
              params.area = params?.area.map((obj: any) => Number(obj.value));
              await postCreateCarrier(params);
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

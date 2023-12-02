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
  option: any;
  onClose?: () => void;
  callback?: () => void;
}> = ({ open, onClose = () => {}, option: carrierData, callback }) => {
  const theme = useTheme();
  const formRef = React.useRef<nygFormik>(null);

  React.useEffect(() => {
    // formRef.current?.setFieldValue()
    open && console.log("!2");
    open &&
      setTimeout(() => {
        console.log("formRef.current", formRef.current);
        formRef?.current?.setValues({
          area: [{ label: 1, value: 1 }],
        });
      }, 0);
  }, [open, formRef]);

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
              required: true,
            },
            {
              name: "name",
              label: "车体名称",
              type: "text",
              required: true,
            },
            {
              name: "id",
              label: "车辆编号",
              type: "text",
              required: true,
            },
            {
              name: "type",
              label: "车辆类型",
              type: "select",
              items: carrierData,
              required: true,
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
            await formRef?.current?.validateForm();
            await formRef?.current?.submitForm();
            const { isValid, values }: any = formRef.current || {};

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

import { useRequest } from "ahooks";
import { CreateStationInfos } from "apis";
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
const AddDialog: React.FC<{
  open: boolean;
  vertexData?: any;
  carrierData?: any;
  chassisList?: any;
  onClose?: () => void;
  callback?: () => void;
  ruleCarrierData?: any;
  carrierOptionsData?: any;
  controlStates?: any;
  chargingPiles?: any;
}> = ({
  open,
  onClose = () => {},
  callback,
  ruleCarrierData = [],
  controlStates = [],
  chargingPiles = [],
}) => {
  const { runAsync: run } = useRequest(CreateStationInfos, {
    manual: true,
  });
  const theme = useTheme();
  const formRef = React.useRef<nygFormik>(null);

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>添加车型</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`,
        }}
      >
        <MaterialForm
          columns={3}
          ref={formRef}
          defaultValue={{}}
          schemaObject={[
            {
              name: "name",
              label: "策略名称",
              type: "text",
            },
            {
              name: "planName",
              label: "计划名称",
              type: "text",
              // type: "select",
            },
            {
              name: "CarrierKeys",
              label: "小车编号",
              type: "autoComplete",
              multiple: true,
              items: controlStates,
            },
            {
              name: "carrierType",
              label: "车型",
              type: "select",
              items: ruleCarrierData,
            },
            {
              name: "minLimitBattery",
              label: "低电量百分比",
              type: "number",
            },
            {
              name: "maxLimitBattery",
              label: "高电量百分比",
              type: "number",
            },
            {
              name: "startHour",
              label: "起始小时",
              type: "number",
            },
            {
              name: "endHour",
              label: "结束小时",
              type: "number",
            },
            {
              name: "startMinute",
              label: "起始分钟",
              type: "number",
            },
            {
              name: "endMinute",
              label: "结束分钟",
              type: "number",
            },
            {
              name: "priority",
              label: "任务优先级",
              type: "number",
            },
            {
              name: "level",
              label: "规则优先级",
              type: "number",
            },
            {
              name: "timeLimit",
              label: "空闲时间",
              type: "number",
            },
            {
              name: "completeType",
              label: "充电类型",
              type: "radioGroup",
              items: [
                {
                  value: 3,
                  label: "时间",
                },
                {
                  value: 1,
                  label: "百分比",
                },
              ],
            },
            {
              name: "completeTime",
              label: "充电时间",
              type: "number",
            },
            {
              name: "completePercent",
              label: "充电百分比",
              type: "number",
            },
            {
              name: "pileKeys",
              label: "充电桩",
              type: "autoComplete",
              multiple: true,
              items: chargingPiles,
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
            console.log(values);

            if (isValid) {
              const sendData = {
                ...values,
                // Genus: 3,
                AreaID: values.AreaID.map((item) => Number(item.value)),
                PointKey: Number(values.PointKey.value),
                Type: Number(values.Type),
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

import { useAsyncEffect } from "ahooks";
import { getGetCarrierTrack } from "apis";
import * as React from "react";
import { useDictStore } from "store";
import {
  BaseTable,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useTheme,
} from "ui";

const InfoDialog: React.FC<{
  open: boolean;
  onClose?: () => void;
  callback?: () => void;
  row?: Record<string, any>;
}> = ({ open, onClose = () => {}, callback, row = {} }) => {
  const [tableData, setTableData] = React.useState([]);
  const theme = useTheme();
  const { dicts } = useDictStore();

  const _Dict = React.useMemo(() => {
    const obj: any = {},
      ary = ["ControlState", "GraphGenus", "RouteState"];
    ary.forEach((key: string) => {
      if (!dicts[key] || !dicts[key]?.length) dicts[key] = [];
      dicts[key]?.forEach((item: any) => {
        !obj[key] && (obj[key] = {});
        obj[key][item.value] = item.label;
      });
    });
    return obj;
  }, [dicts]);

  React.useEffect(() => {
    console.log("_Dict", _Dict);
  }, [_Dict]);

  useAsyncEffect(async () => {
    if (!row?.id) return;
    const { data } = await getGetCarrierTrack(row?.id);
    setTableData(data || []);
  }, [row]);

  const column = [
    {
      accessorKey: "type",
      id: "type",
      header: "路径类型",
      Cell: ({ cell }: any) => {
        return <div>{_Dict["GraphGenus"][cell.getValue()]}</div>;
      },
    },
    {
      accessorKey: "id",
      id: "id",
      header: "路径编号",
    },
    {
      accessorKey: "state1",
      id: "state1",
      header: "调度状态",
      Cell: ({ cell }: any) => {
        return <div>{_Dict["RouteState"][cell.getValue()]}</div>;
      },
    },
    {
      accessorKey: "state",
      id: "state",
      header: "路径状态",
    },
  ];

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>路径状态</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`,
        }}
      >
        <div style={{ display: "flex", width: "100%", gap: 20 }}>
          <TextField
            disabled
            label="车辆编号"
            variant="filled"
            defaultValue={row.id}
            style={{ flex: 1 }}
          />
          <TextField
            disabled
            label="车辆位置"
            variant="filled"
            defaultValue={row.carrierPos}
            style={{ flex: 1 }}
          />
          <TextField
            disabled
            label="当前电量"
            variant="filled"
            defaultValue={row.elecQuantity}
            style={{ flex: 1 }}
          />
        </div>
        <div style={{ display: "flex", width: "100%", gap: 20, marginTop: 10 }}>
          <TextField
            disabled
            label="车辆速度"
            variant="filled"
            defaultValue={row.loadSpeed}
            style={{ flex: 1 }}
          />
          <TextField
            disabled
            label="控制状态"
            variant="filled"
            style={{ flex: 1 }}
            defaultValue={
              _Dict["ControlState"]
                ? _Dict["ControlState"][row.controlState]
                : "-"
            }
          />
          <TextField
            disabled
            label="交管车辆"
            variant="filled"
            style={{ flex: 1 }}
            defaultValue={row.id}
          />
        </div>
        <div style={{ height: 10 }}></div>
        <BaseTable
          columns={column}
          data={tableData || []}
          enableStickyHeader={true}
          enableTopToolbar={false}
          muiTablePaperProps={{
            sx: {
              height: "100%",
              padding: 2,
            },
          }}
          muiTableContainerProps={{
            sx: {
              maxHeight: 400,
            },
          }}
        ></BaseTable>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={async () => {
            onClose();
            callback && callback();
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
export default InfoDialog;

import AcUnitIcon from "@mui/icons-material/AcUnit";
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useAsyncEffect } from "ahooks";
import {
  delCreateCarrier,
  getSimulationCarrierLogin,
  notification,
  postGetCarrierInfo,
  postGetControlOptions,
  postGetControlStates,
  postRemoveCarrier,
  postSendRemoteStop,
  postUpdateCarrierState,
} from "apis";
import { useMemo, useState } from "react";
import { useDictStore } from "store";
import { BaseTable, Box, Button, ButtonGroup } from "ui";

import DelButton from "@/component/delButton";
import Refresh from "@/component/refreshIcon";

import AddDialog from "./components/add";
import EditDialog from "./components/edit";
import InfoDialog from "./components/info";

const Vehicle = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [row, setRow] = useState({});

  const { dicts } = useDictStore();

  const _Dict = useMemo(() => {
    const obj: any = {},
      ary = ["ControlState", "DeviceState", "GoodsState", "GraphGenus"];
    console.log("dicts", dicts);
    ary.forEach((key: string) => {
      if (!dicts[key] || !dicts[key]?.length) return;
      dicts[key]?.forEach((item: any) => {
        !obj[key] && (obj[key] = {});
        obj[key][item.value] = item.label;
      });
    });
    return obj;
  }, [dicts]);

  useAsyncEffect(async () => {
    await getTableData();
  }, []);

  const TaskColumn = [
    {
      accessorKey: "loadWidth",
      id: "loadWidth",
      header: "状态",
      Cell: ({ row }) => {
        const { errorCode, heart } = row?.original;
        return (
          <div>
            {errorCode > 0 ? (
              <span style={{ color: "red" }}>异常</span>
            ) : heart > 0 ? (
              <span style={{ color: "white" }}>在线</span>
            ) : (
              <span style={{ color: "#9d9c9c" }}>离线</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      id: "id",
      header: "车辆编号",
    },
    {
      accessorKey: "name",
      id: "name",
      header: "车体名称",
    },
    {
      accessorKey: "chassisType",
      id: "chassisType",
      header: "车辆类型",
    },
    {
      accessorKey: "carrierPos",
      id: "carrierPos",
      header: "车辆位置",
    },
    {
      accessorKey: "elecQuantity",
      id: "elecQuantity",
      header: "当前电量",
    },
    {
      accessorKey: "routeType",
      id: "routeType",
      header: "当前途径",
      Cell: ({ cell, row }: any) => {
        return (
          <div>
            {_Dict["GraphGenus"][cell.getValue()]} {" - "}
            {row?.original?.currentRoute}
          </div>
        );
      },
    },
    {
      accessorKey: "controlState",
      id: "controlState",
      header: "控制状态",
      Cell: ({ cell }: any) => {
        return <div>{_Dict["ControlState"][cell.getValue()]}</div>;
      },
    },
    {
      accessorKey: "goodsStatus",
      id: "goodsStatus",
      header: "载货状态",
      Cell: ({ cell }: any) => {
        return <div>{_Dict["GoodsState"][cell.getValue()]}</div>;
      },
    },
    {
      accessorKey: "ip",
      id: "ip",
      header: "交管车辆",
      Cell: ({ row }: any) => {
        return <div>{row?.original?.trafficControlCar || "无"}</div>;
      },
    },
    {
      accessorKey: "currentTask",
      id: "currentTask",
      header: "当前任务",
    },
    {
      accessorKey: "isLockdown",
      id: "isLockdown",
      header: "锁定状态",
      Cell: ({ cell }: any) => {
        return <div>{!cell.getValue() ? "锁定" : "未锁定"}</div>;
      },
    },
    {
      accessorKey: "carrierState",
      id: "carrierState",
      header: "急停状态",
      Cell: ({ cell }: any) => {
        return <div>{_Dict["DeviceState"][cell.getValue()]}</div>;
      },
    },
    {
      accessorKey: "actions",
      header: "操作",
      enableColumnFilter: false,
      enableSorting: false,
      Cell: ({ row, table }) => {
        return (
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              gap: "0.5rem",
              width: "300px",
            }}
          >
            <Button
              component="label"
              size="small"
              color="warning"
              onClick={async () => {
                setEditOpen(true);
                const id = row?.original?.id;
                const { data } = await postGetCarrierInfo(id);
                setRow(data);
              }}
              startIcon={<EditNoteIcon />}
            >
              配置
            </Button>
            <Button
              component="label"
              size="small"
              color="inherit"
              onClick={async () => {
                const id = row?.original?.id;
                const { msg } = await postRemoveCarrier({ id });
                RcsMessage.success(msg);
              }}
              startIcon={<SportsSoccerIcon />}
            >
              踢出
            </Button>
            <DelButton
              delFn={async () => {
                const id = row?.original?.id;
                await delCreateCarrier(id);
                RcsMessage.success();
                table.resetRowSelection();
                getTableData();
              }}
            />
            <Button
              component="label"
              size="small"
              color="success"
              onClick={async () => {
                const id = row?.original?.id;
                const { msg } = await getSimulationCarrierLogin(id);
                RcsMessage.success(msg);
              }}
              startIcon={<AcUnitIcon />}
            >
              激活
            </Button>
          </div>
        );
      },
    },
  ];

  const getInitTableData = () => {
    const hash: Record<string, any> = {};
    TaskColumn.forEach((column) => {
      hash[column.accessorKey] = "-";
    });
    return hash;
  };

  const getTableData = async () => {
    setLoading(true);
    const fn = [postGetControlOptions({}), postGetControlStates({})];
    const all: any = Promise.all(fn.map((promise) => promise.catch(() => {})));
    const [options = { data: [] }, states = { data: [] }] = await all;
    const max = Math.max(...[options?.data.length, states?.data.length]);
    let index = -1;
    const initHash = getInitTableData();
    const hashMap: Record<string, any> = {};

    while (index < max - 1) {
      index++;
      const optionsId = options?.data[index]?.id;
      const statesId = states?.data[index]?.id;

      optionsId &&
        (hashMap[optionsId] = hashMap[optionsId]
          ? { ...hashMap[optionsId], ...options?.data[index] }
          : { ...initHash, ...options?.data[index] });
      statesId &&
        (hashMap[statesId] = hashMap[statesId]
          ? { ...hashMap[statesId], ...states?.data[index] }
          : { ...initHash, ...states?.data[index] });
    }
    setTableData(Object.values(hashMap));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const RcsMessage = {
    success: (msg?: string) => {
      notification.success({
        message: msg || `操作成功`,
        description: new Date().getTime(),
      });
    },
  };
  // 锁车0 解锁1
  const updateCarrierState = async (table: any, status: 0 | 1) => {
    if (table.getSelectedRowModel().rows.length != 1) {
      notification.warning({
        message: `警告`,
        description: "请选择一条数据",
      });
      return;
    }
    const [row] = table.getSelectedRowModel().rows;
    await postUpdateCarrierState({ carId: row?.original?.id, key: status });
    table.resetRowSelection();
    RcsMessage.success();
  };
  // 急停 0急停 1解除
  const sendRemoteStop = async (table: any, status: 0 | 1) => {
    if (table.getSelectedRowModel().rows.length != 1) {
      notification.warning({
        message: `警告`,
        description: "请选择一条数据",
      });
      return;
    }
    const [row] = table.getSelectedRowModel().rows;
    await postSendRemoteStop({ carId: row?.original?.id, key: status });
    RcsMessage.success();
    table.resetRowSelection();
  };

  return (
    <>
      <BaseTable
        columns={TaskColumn}
        data={tableData || []}
        muiTablePaperProps={{
          sx: {
            height: "100%",
            padding: 2,
          },
        }}
        loading={loading}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: "4px",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                color="warning"
                onClick={() => {
                  table.resetRowSelection();
                  getTableData();
                }}
              >
                <Refresh loading={loading}></Refresh>
                刷新
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => {
                  setAddOpen(true);
                }}
              >
                <AddIcon />
                新增
              </Button>
              <ButtonGroup variant="outlined">
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => {
                    updateCarrierState(table, 0);
                  }}
                >
                  {"锁定"}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    updateCarrierState(table, 1);
                  }}
                >
                  {"解锁"}
                </Button>
              </ButtonGroup>
              <ButtonGroup variant="outlined">
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => {
                    sendRemoteStop(table, 0);
                  }}
                >
                  {"急停"}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    sendRemoteStop(table, 1);
                  }}
                >
                  {"解除"}
                </Button>
              </ButtonGroup>
            </Box>
          );
        }}
        initialState={{
          columnPinning: {
            right: ["actions"],
          },
        }}
        enableFullScreenToggle={false}
        enableHiding={false}
        enableDensityToggle={false}
        enableColumnActions={false}
        enableRowSelection={true}
        muiTableBodyCellProps={({ row }) => ({
          onDoubleClick: async () => {
            const id = row?.original?.id;
            const { data } = await postGetCarrierInfo(id);
            setRow({ ...row?.original, ...data });
            setInfoOpen(true);
          },
        })}
      />
      <AddDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        callback={() => {
          RcsMessage.success();
          // table.resetRowSelection();
          getTableData();
        }}
      />
      <EditDialog
        open={editOpen}
        row={row}
        onClose={() => setEditOpen(false)}
        callback={() => {
          RcsMessage.success();
          // table.resetRowSelection();
          getTableData();
        }}
      />
      <InfoDialog
        open={infoOpen}
        row={row}
        onClose={() => setInfoOpen(false)}
      ></InfoDialog>
    </>
  );
};

export default Vehicle;

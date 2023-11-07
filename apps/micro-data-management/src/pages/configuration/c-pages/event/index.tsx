import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useRequest } from "ahooks";
import {
  delStationInfos,
  GetCarrierOptions,
  GetChassisList,
  GetEventsPageList,
  getVertexs,
} from "apis";
import type { FC, ReactNode } from "react";
import React, { memo } from "react";
import { useDictStore } from "store";
import { BaseTable, Box, Button, MenuItem, TextField } from "ui";
import { getUpperCaseKeyObject } from "utils";

import DelButton from "@/component/delButton";
import Refresh from "@/component/refreshIcon";

import AddDialog from "./components/add";
import EditDialog from "./components/edit";

interface IProps {
  children?: ReactNode;
}

const dictsTransform = (arr: [], label: string, value: string) => {
  if (!arr) {
    return [];
  }
  return arr.map((item) => ({
    label: String(item[label]),
    value: item[value],
  }));
};

//事件配置
const Event: FC<IProps> = () => {
  const { dicts } = useDictStore();
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [row, setRow] = React.useState({});
  const {
    data: chassisData,
    loading,
    run: getChass,
  } = useRequest(() => GetEventsPageList({ id: 0 }));

  const { runAsync: delFn } = useRequest(delStationInfos, {
    manual: true,
  });

  const { data: vertexData } = useRequest(() => getVertexs());

  const { data: carrierData } = useRequest(GetCarrierOptions);
  const { data: chassisList } = useRequest(GetChassisList);

  const convertChassisList = dictsTransform(chassisList?.data, "model", "id");

  const columns = [
    {
      accessorKey: "id",
      header: "事件ID",
    },
    {
      accessorKey: "genus",
      header: "元素类型",
      Filter: ({ header }) => {
        return (
          <TextField
            fullWidth
            margin="none"
            onChange={(e) =>
              header.column.setFilterValue(e.target.value || undefined)
            }
            placeholder="Filter"
            select
            value={header.column.getFilterValue() ?? ""}
            variant="standard"
          >
            {/*@ts-ignore*/}
            <MenuItem value={null}>All</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
            {dicts.GraphGenus?.map((item) => {
              return <MenuItem value={item.value}>{item.label}</MenuItem>;
            })}
          </TextField>
        );
      },
      filterFn: (row, _columnIds, filterValue) => {
        return row.getValue<string>("genus") === filterValue;
      },
      Cell: ({ row }) => {
        const { original } = row;
        const tyles = dicts.GraphGenus?.find(
          (item) => item.value === original.genus
        );
        return <>{tyles?.label || ""}</>;
      },
    },
    {
      accessorKey: "routeKey",
      header: "路径ID",
    },
    {
      accessorKey: "carrierType",
      header: "车辆类型",
      Cell: ({ row }) => {
        const { original } = row;
        const tyles = convertChassisList?.find(
          (item) => item.value === original.carrierType
        );
        return <>{tyles?.label || ""}</>;
      },
    },
    {
      accessorKey: "doTime",
      enableFilters: true,
      header: "执行阶段",
      Cell: ({ row }) => {
        return <>{dicts.EventTime[row.getValue("doTime")].label}</>;
      },
    },
    {
      accessorKey: "waitTime",
      header: "等待阶段",
      Cell: ({ row }) => {
        return <>{dicts.EventTime[row.getValue("waitTime")].label}</>;
      },
    },
    {
      accessorKey: "eventType",
      header: "事件类型",
      Cell: ({ row }) => {
        const { original } = row;
        const tyles = dicts.EventType?.find(
          (item) => item.value === original.eventType
        );
        return <>{tyles?.label || ""}</>;
      },
    },
    {
      accessorKey: "timeOut",
      header: "超时(ms)",
    },
    {
      accessorKey: "delay",
      header: "延时(ms)",
    },
    {
      accessorKey: "priority",
      enableColumnFilter: false,
      header: "优先级",
    },
    {
      accessorKey: "checkHasGoods",
      header: "载货判断",
      Cell: ({ row }) => {
        const { original } = row;

        const tyles = dicts.CheckGoods?.find(
          (item) => item.value === original.checkHasGoods
        );
        return <>{tyles?.label || ""}</>;
      },
    },
    {
      accessorKey: "description",
      header: "事件描述",
    },
    {
      accessorKey: "actions",
      header: "操作",
      enableColumnFilter: false,
      enableSorting: false,
      Cell: ({ row }) => {
        return (
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              gap: "0.5rem",
              width: "100px",
            }}
          >
            <Button
              component="label"
              size="small"
              color="warning"
              onClick={() => {
                setEditOpen(true);
                setRow(row.original);
              }}
              startIcon={<EditNoteIcon />}
            >
              修改
            </Button>
            <DelButton
              delFn={async () => {
                await delFn({
                  id: row.original.id,
                });
                getChass();
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <BaseTable
        columns={columns}
        data={chassisData?.data.data || []}
        muiTablePaperProps={{
          sx: {
            height: "100%",
            padding: 2,
          },
        }}
        loading={loading}
        renderTopToolbarCustomActions={() => {
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
                  getChass();
                }}
              >
                <Refresh loading={loading}></Refresh>
                刷新
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => setOpen(true)}
              >
                <AddIcon />
                新增
              </Button>
            </Box>
          );
        }}
        initialState={{
          columnPinning: {
            right: ["actions"],
          },
        }}
        enableToolbarInternalActions={true}
        enableFullScreenToggle={false}
        enableHiding={false}
        enableDensityToggle={false}
        enableColumnActions={false}
      />
      <AddDialog
        open={open}
        onClose={() => setOpen(false)}
        vertexData={dictsTransform(vertexData?.data, "id", "id")}
        carrierData={dictsTransform(carrierData?.data, "name", "id")}
        chassisList={dictsTransform(convertChassisList)}
        callback={() => {
          getChass();
        }}
      />
      <EditDialog
        open={editOpen}
        row={getUpperCaseKeyObject(row)}
        onClose={() => setEditOpen(false)}
        vertexData={dictsTransform(vertexData?.data, "id", "id")}
        carrierData={dictsTransform(carrierData?.data, "name", "id")}
        chassisList={dictsTransform(chassisList?.data, "model", "id")}
        callback={() => getChass()}
      />
    </>
  );
};

export default memo(Event);

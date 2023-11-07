import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useRequest } from "ahooks";
import { delChassisInfos, getChassisInfos } from "apis";
import type { FC, ReactNode } from "react";
import React, { memo } from "react";
import { useDictStore } from "store";
import { BaseTable, Box, Button } from "ui";
import { getUpperCaseKeyObject } from "utils";

import DelButton from "@/component/delButton";
import Refresh from "@/component/refreshIcon";

import AddDialog from "./components/add";
import EditDialog from "./components/edit";

interface IProps {
  children?: ReactNode;
}

// 车型配置
const VehicleType: FC<IProps> = () => {
  const { dicts } = useDictStore();
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [row, setRow] = React.useState({});
  const {
    data: chassisData,
    loading,
    run: getChass,
  } = useRequest(() => getChassisInfos({ type: 0 }));

  const { runAsync: delFn } = useRequest(delChassisInfos, {
    manual: true,
  });

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "type",
      header: "类型",
      Cell: ({ row }) => {
        const { original } = row;
        const tyles = dicts.CarrierType?.find(
          (item) => item.value === original.type
        );
        return <>{tyles?.label || ""}</>;
      },
    },
    {
      accessorKey: "model",
      header: "名称",
    },
    {
      accessorKey: "forcedCharge",
      header: "强制充电电量",
    },
    {
      accessorKey: "noLoadOffsetX",
      header: "空载偏移X",
    },
    {
      accessorKey: "noLoadOffsetY",
      header: "空载偏移Y",
    },
    {
      accessorKey: "noLoadWidth",
      header: "空载车宽",
    },
    {
      accessorKey: "noLoadLength",
      header: "空载车长",
    },
    {
      accessorKey: "chassisModel",
      header: "模型文件",
    },
    {
      accessorKey: "actions",
      header: "操作",
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
        data={chassisData?.data || []}
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
      />
      <AddDialog
        open={open}
        onClose={() => setOpen(false)}
        callback={() => {
          getChass();
        }}
      />
      <EditDialog
        open={editOpen}
        row={getUpperCaseKeyObject(row)}
        onClose={() => setEditOpen(false)}
        callback={() => getChass()}
      />
    </>
  );
};

export default memo(VehicleType);

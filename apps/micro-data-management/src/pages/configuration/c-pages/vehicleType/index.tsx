import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useRequest } from "ahooks";
import { getChassisInfos } from "apis";
import type { FC, ReactNode } from "react";
import React, { memo } from "react";
import { useDictStore } from "store";
import { BaseTable, Button } from "ui";

import AddDialog from "./components/add";

interface IProps {
  children?: ReactNode;
}

// 车型配置
const VehicleType: FC<IProps> = () => {
  const { dicts } = useDictStore();
  const [open, setOpen] = React.useState(false);
  const { data: chassisData, loading } = useRequest(() =>
    getChassisInfos({ type: 0 })
  );

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
      Cell: () => {
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
              startIcon={<EditNoteIcon />}
            >
              修改
            </Button>
            <Button component="label" size="small" startIcon={<DeleteIcon />}>
              删除
            </Button>
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
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => setOpen(true)}
            >
              <AddIcon />
              新增
            </Button>
          );
        }}
        initialState={{
          columnPinning: {
            right: ["actions"],
          },
        }}
      />
      <AddDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default memo(VehicleType);

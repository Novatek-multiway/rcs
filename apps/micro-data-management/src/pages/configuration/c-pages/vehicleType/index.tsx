import AddIcon from "@mui/icons-material/Add";
import { useRequest } from "ahooks";
import { getChassisInfos } from "apis";
import type { FC, ReactNode } from "react";
import React, { memo } from "react";
import { useDictStore } from "store";
import { BaseTable, Button } from "ui";

interface IProps {
  children?: ReactNode;
}

// 车型配置
const VehicleType: FC<IProps> = () => {
  const { dicts } = useDictStore();
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
        const tyles = dicts?.find((item) => item.dictValueI === original.type);
        return <>{tyles?.dictLabel || ""}</>;
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
            <Button variant="outlined" size="small" color="primary">
              <AddIcon />
              新增
            </Button>
          );
        }}
      />
    </>
  );
};

export default memo(VehicleType);

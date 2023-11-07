import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useRequest } from "ahooks";
import {
  ChangeActive,
  DeleteRouteFileInfo,
  GetChassisList,
  GetMapOptionPageList,
  GetRuleChassisInfos,
  GetRuleControlStates,
  getVertexs,
} from "apis";
import type { FC, ReactNode } from "react";
import React, { memo } from "react";
import { BaseTable, Box, Button, Switch } from "ui";

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
const MapPage: FC<IProps> = () => {
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [row, setRow] = React.useState({});
  const {
    data: chassisData,
    loading,
    run: getChass,
  } = useRequest(() => GetMapOptionPageList({ id: 0 }));

  const { runAsync: delFn } = useRequest(DeleteRouteFileInfo, {
    manual: true,
  });
  const { data: carrierData } = useRequest(GetRuleChassisInfos);
  const { data: controlStates } = useRequest(GetRuleControlStates);

  const { runAsync: changeFn } = useRequest(ChangeActive, {
    manual: true,
    onSuccess: () => {
      getChass();
    },
  });

  const { data: vertexData } = useRequest(() => getVertexs());
  const { data: chassisList } = useRequest(GetChassisList);

  const convertChassisList = dictsTransform(chassisList?.data, "model", "id");
  const carsList = dictsTransform(controlStates?.data, "id", "id");

  const columns = [
    {
      accessorKey: "id",
      header: "事件ID",
    },
    {
      accessorKey: "projectName",
      header: "项目名称",
    },
    {
      accessorKey: "routeName",
      header: "地图名称",
    },
    {
      accessorKey: "mapCarrier",
      header: "适用车辆",
      Cell: ({ row }) => {
        const { original } = row;
        const tyles = carsList?.find(
          (item) => item.value === original.mapCarrier
        );
        return <>{tyles?.label || ""}</>;
      },
    },
    {
      accessorKey: "mapChassis",
      header: "适用车型",
      Cell: ({ row }) => {
        const { original } = row;
        const tyles = convertChassisList?.find(
          (item) => item.value === original.mapChassis
        );
        return <>{tyles?.label || ""}</>;
      },
    },
    {
      accessorKey: "guid",
      header: "地图GUID",
    },
    {
      accessorKey: "revision",
      enableColumnFilter: false,
      header: "版本号",
    },
    {
      accessorKey: "path",
      header: "地图路径",
    },
    {
      accessorKey: "url",
      header: "地图URL",
    },
    {
      accessorKey: "routeFile",
      header: "路径数据文件名",
    },
    {
      accessorKey: "dwgFile",
      header: "地图Dxf文件名",
    },
    {
      accessorKey: "svgFile",
      header: "地图Svg文件名",
    },
    {
      accessorKey: "isActive",
      header: "是否激活",
      Cell: ({ row }) => {
        return (
          <>
            <Switch
              checked={row.original.isActive}
              onChange={() =>
                changeFn({
                  id: row.original.id,
                  isActive: !row.original.isActive,
                })
              }
            />
          </>
        );
      },
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
                新增路径文件
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="success"
                onClick={() => setOpen(true)}
              >
                <AddIcon />
                上传底图文件
              </Button>
            </Box>
          );
        }}
        initialState={{
          columnPinning: {
            right: ["isActive", "actions"],
          },
        }}
        enableToolbarInternalActions={true}
        enableFullScreenToggle={false}
        enableHiding={false}
        enableDensityToggle={false}
        enableColumnActions={false}
        enableColumnFilters={false}
      />
      <AddDialog
        open={open}
        onClose={() => setOpen(false)}
        carrierData={convertChassisList}
        controlStates={carsList}
        callback={() => {
          getChass();
        }}
      />
      <EditDialog
        open={editOpen}
        row={row}
        onClose={() => setEditOpen(false)}
        vertexData={dictsTransform(vertexData?.data, "id", "id")}
        carrierData={dictsTransform(carrierData?.data, "name", "id")}
        chassisList={dictsTransform(chassisList?.data, "model", "id")}
        callback={() => getChass()}
      />
    </>
  );
};

export default memo(MapPage);

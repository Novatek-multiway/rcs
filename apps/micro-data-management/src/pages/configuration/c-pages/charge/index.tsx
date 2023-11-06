import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EuroIcon from "@mui/icons-material/Euro";
import { useRequest } from "ahooks";
import {
  DelRule,
  GetRuleChargingPiles,
  GetRuleChassisInfos,
  GetRuleControlStates,
  GetRules,
} from "apis";
import type { FC, ReactNode } from "react";
import React, { memo } from "react";
// import { useDictStore } from "store";
import { BaseTable, Box, Button, Chip } from "ui";
import { dictsTransform } from "utils";

import DelButton from "@/component/delButton";
import Refresh from "@/component/refreshIcon";

import AddDialog from "./components/add";
import EditDialog from "./components/edit";

interface IProps {
  children?: ReactNode;
}

// 车型配置
const VehicleType: FC<IProps> = () => {
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [row, setRow] = React.useState({});
  const {
    data: chassisData,
    loading,
    run: getChass,
  } = useRequest(() => GetRules({ type: 0 }));

  const { runAsync: delFn } = useRequest(DelRule, {
    manual: true,
  });

  const { data: ruleCarrierData } = useRequest(GetRuleChassisInfos);
  const { data: controlStates } = useRequest(GetRuleControlStates);
  const { data: chargingPiles } = useRequest(GetRuleChargingPiles);

  const ConvertChargingPiles = dictsTransform(
    chargingPiles?.data,
    "displayName",
    "id"
  );

  const columns = [
    {
      accessorKey: "id",
      header: "编号",
    },
    {
      accessorKey: "name",
      header: "策略名称",
    },
    {
      accessorKey: "planName",
      enableFilters: true,
      header: "计划名称",
    },
    {
      accessorKey: "carrierKeys",
      header: "小车编号",
    },
    {
      accessorKey: "carrierType",
      header: "车型",
      Cell: ({ row }) => {
        const { original } = row;
        const tyles = dictsTransform(
          ruleCarrierData?.data,
          "model",
          "id"
        )?.find((item) => item.value === original.carrierType);
        return (
          <>
            {tyles?.label ? (
              <Chip
                size="small"
                // avatar={<Avatar></Avatar>}
                color="primary"
                variant="outlined"
                icon={<EuroIcon />}
                label={tyles?.label}
              />
            ) : (
              ""
            )}
          </>
        );
      },
    },
    {
      accessorKey: "minLimitBattery",
      header: "电量区间",
    },
    {
      accessorKey: "endHour",
      header: "策略时间",
    },
    {
      accessorKey: "completeType",
      enableColumnFilter: false,
      Cell: ({ row }) => {
        const { original } = row;
        const flat = original.completeType === 1;
        return (
          <Chip
            size="small"
            // avatar={<Avatar></Avatar>}
            color={flat ? "success" : "warning"}
            variant="outlined"
            label={flat ? "百分比" : "时间"}
          ></Chip>
        );
      },
      header: "充电类型",
    },
    {
      accessorKey: "completeTime",
      header: "充电时间",
    },
    {
      accessorKey: "timeLimit",
      header: "空闲时间",
    },
    {
      accessorKey: "completePercent",
      header: "完成占比",
    },
    {
      accessorKey: "pileKeys",
      header: "充电桩",
      Cell: ({ row }) => {
        const { original } = row;
        const pileKeys = original.pileKeys.split(",");
        if (!pileKeys.length) return null;
        return chargingPiles?.data.map((item) => {
          if (pileKeys.includes(String(item.id))) {
            return <Chip size="small" label={item.displayName} />;
          }
        });
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
        ruleCarrierData={dictsTransform(ruleCarrierData?.data, "model", "id")}
        // vertexData={vertexData?.data}
        controlStates={dictsTransform(controlStates?.data)}
        chargingPiles={ConvertChargingPiles}
        callback={() => {
          getChass();
        }}
      />
      <EditDialog
        open={editOpen}
        row={row}
        ruleCarrierData={dictsTransform(ruleCarrierData?.data, "model", "id")}
        // vertexData={vertexData?.data}
        controlStates={dictsTransform(controlStates?.data)}
        chargingPiles={ConvertChargingPiles}
        onClose={() => setEditOpen(false)}
        callback={() => getChass()}
      />
    </>
  );
};

export default memo(VehicleType);

export const TaskColumn = [
  // {
  //   accessorKey: "id",
  //   id: "id",
  //   header: "车辆编号",
  // },
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
    accessorKey: "carrierPosFrontWPF",
    id: "carrierPosFrontWPF",
    header: "当前途径",
  },
  {
    accessorKey: "controlState",
    id: "controlState",
    header: "控制状态",
    Cell: ({ cell }: any) => {
      // 先放到window,后面再改到store
      return <div>{(window as any).dict["ControlState"][cell.getValue()]}</div>;
    },
  },
  {
    accessorKey: "goodsStatus",
    id: "goodsStatus",
    header: "载货状态",
    Cell: ({ cell }: any) => {
      // 先放到window,后面再改到store
      return <div>{(window as any).dict["GoodsState"][cell.getValue()]}</div>;
    },
  },
  {
    accessorKey: "ip",
    id: "ip",
    header: "交管车辆",
    Cell: ({ row }: any) => {
      // 先放到window,后面再改到store
      return <div>{row?.original?.id}</div>;
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
      // 先放到window,后面再改到store
      return <div>{cell.getValue() ? "锁定" : "未锁定"}</div>;
    },
  },
  {
    accessorKey: "carrierState",
    id: "carrierState",
    header: "急停状态",
    Cell: ({ cell }: any) => {
      // 先放到window,后面再改到store
      return <div>{(window as any).dict["DeviceState"][cell.getValue()]}</div>;
    },
  },
];

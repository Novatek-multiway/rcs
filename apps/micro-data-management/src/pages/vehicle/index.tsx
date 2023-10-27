import { useAsyncEffect } from "ahooks";
import {
  getGetDictInfo,
  getSimulationCarrierLogin,
  postGetControlOptions,
  postGetControlStates,
  postRemoveCarrier,
  postSendRemoteStop,
  postUpdateCarrierState,
} from "apis";
import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  DialogContent,
  DialogTitle,
  Grid,
  MuiTable,
  Snackbar,
} from "ui";

import { TaskColumn } from "./columns";

const initMessageConfig = {
  visible: false,
  title: "",
};
const Vehicle = () => {
  // const [carHashMap, setCarHashMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [messageConfig, setMessageConfig] = useState(initMessageConfig);

  useAsyncEffect(async () => {
    await getDictInfo();
    await getTableData();
  }, []);

  const getTableData = async () => {
    setLoading(true);
    const fn = [postGetControlOptions({}), postGetControlStates({})];
    const all: any = Promise.all(fn.map((promise) => promise.catch(() => {})));
    const [options, states] = await all;
    const max = Math.max(...[options?.data.length, states?.data.length]);
    let index = -1;
    const hashMap: Record<string, any> = {};
    while (index < max - 1) {
      index++;
      const optionsId = options?.data[index]?.id;
      const statesId = states?.data[index]?.id;

      hashMap[optionsId] = hashMap[optionsId]
        ? { ...hashMap[optionsId], ...options?.data[index] }
        : options?.data[index];
      hashMap[statesId] = hashMap[statesId]
        ? { ...hashMap[statesId], ...states?.data[index] }
        : states?.data[index];
    }
    console.log("hashMap", hashMap, Object.values(hashMap));
    setTableData(Object.values(hashMap));
    // setCarHashMap(hashMap);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const getDictInfo = async () => {
    const keysMap: Record<string, any> = {
      DeviceState: {},
      ControlState: {},
      GoodsState: {},
    };
    const fn = Object.keys(keysMap).map((DictName) => {
      return getGetDictInfo(DictName);
    });
    const all: any = await Promise.all(
      fn.map((promise) => promise.catch(() => {}))
    );
    all.forEach((item: any) => {
      item?.data?.map((dict: Record<string, any>) => {
        keysMap[dict.dictName][dict.dictValueI] = dict.dictLabel;
      });
    });
    (window as any).dict = keysMap;
    // console.log("all", keysMap);
  };

  // 锁车0 解锁1
  const updateCarrierState = async (table: any, status: 0 | 1) => {
    if (table.getSelectedRowModel().rows.length != 1) {
      alert("请选择一条数据");
      return;
    }
    const [row] = table.getSelectedRowModel().rows;
    console.log("row", row);
    setMessageConfig(initMessageConfig);
    await postUpdateCarrierState({ carId: row?.original?.id, key: status });
    setMessageConfig({
      ...messageConfig,
      visible: true,
    });
    table.resetRowSelection();
    setTimeout(() => {
      setMessageConfig(initMessageConfig);
    }, 2000);
  };

  // 急停 0急停 1解除
  const sendRemoteStop = async (table: any, status: 0 | 1) => {
    if (table.getSelectedRowModel().rows.length != 1) {
      alert("请选择一条数据");
      return;
    }
    const [row] = table.getSelectedRowModel().rows;
    console.log("row", row);
    setMessageConfig(initMessageConfig);
    await postSendRemoteStop({ carId: row?.original?.id, key: status });
    setMessageConfig({
      ...messageConfig,
      visible: true,
    });
    table.resetRowSelection();
    setTimeout(() => {
      setMessageConfig(initMessageConfig);
    }, 2000);
  };

  // 操作栏按钮
  const renderTopToolbarCustomComponents = ({ table }) => {
    return (
      <Box sx={{ display: "flex", gap: "1rem", p: "4px" }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            console.log("click something");
            console.log("table", table.getSelectedRowModel().rows);
            console.log(table);
            table.setCreatingRow(true);
          }}
        >
          {"新增"}
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            table.resetRowSelection();
            getTableData();
          }}
        >
          {"刷新"}
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
  };

  return (
    <Grid
      container
      // rowSpacing={2}
      // columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      sx={{ height: "100%" }}
    >
      <Grid xs={12} item>
        {tableData.length && (
          <MuiTable
            columns={TaskColumn}
            data={tableData}
            // pageChange={setPage}
            // rowCount={rowCount}
            // enableColumnResizing
            globalFilterFn="contains"
            enablePagination={false}
            enableFullScreenToggle={false}
            defaultColumn={{
              minSize: 100,
              size: 100,
              maxSize: 200,
            }}
            enableRowActions
            enableRowSelection
            muiTableBodyCellProps={({ cell }) => ({
              onDoubleClick: (event) => {
                console.info(event, cell.id);
              },
            })}
            renderCreateRowDialogContent={() => (
              <>
                <DialogTitle>添加车辆配置信息</DialogTitle>
                <DialogContent
                  sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                >
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>2</div>
                    <div style={{ flex: 1 }}>333</div>
                  </div>
                </DialogContent>
              </>
            )}
            renderTopToolbarCustomActions={renderTopToolbarCustomComponents}
            renderRowActions={({ row }) => (
              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  gap: "0.5rem",
                  width: "200px",
                }}
              >
                <span style={{ color: "#00c6c7", cursor: "pointer" }}>
                  配置
                </span>
                /
                <span
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={async () => {
                    setMessageConfig(initMessageConfig);
                    const id = row?.original?.id;
                    const { msg } = await postRemoveCarrier({ id });
                    setMessageConfig({
                      ...messageConfig,
                      visible: true,
                      title: msg,
                    });
                    setTimeout(() => {
                      setMessageConfig(initMessageConfig);
                    }, 2000);
                  }}
                >
                  踢出
                </span>
                /<span style={{ color: "red", cursor: "pointer" }}>删除</span>/
                <span
                  style={{
                    color: "#00c6c7",
                    cursor: "pointer",
                  }}
                  onClick={async () => {
                    setMessageConfig(initMessageConfig);
                    const id = row?.original?.id;
                    const { msg } = await getSimulationCarrierLogin(id);
                    setMessageConfig({
                      ...messageConfig,
                      visible: true,
                      title: msg,
                    });
                    setTimeout(() => {
                      setMessageConfig(initMessageConfig);
                    }, 2000);
                  }}
                >
                  激活
                </span>
              </div>
            )}
            state={{
              isLoading: loading,
              showLoadingOverlay: false,
              showProgressBars: loading,
              // pagination: { ...page },
            }}
            enableColumnPinning={true}
            initialState={{
              columnPinning: { right: ["mrt-row-actions"] },
              density: "compact",
            }}
          ></MuiTable>
        )}
      </Grid>
      <Snackbar
        open={messageConfig.visible}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          color="success"
          sx={{ background: "#606060", color: "white", width: 300 }}
          onClose={() => {
            setMessageConfig(initMessageConfig);
          }}
        >
          <div>操作成功</div>
          <div>{new Date().getTime() || messageConfig.title}</div>
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Vehicle;

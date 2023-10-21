import * as React from "react";
import Box from "@mui/material/Box";
import ProTip from "./ProTip";
import { postLogin } from "apis";
import { useRequest, useAsyncEffect } from "ahooks";
import { useGlobalStore } from "store";

export default function App(props: any) {
  const { setUserInfo, userInfo } = useGlobalStore();
  // 请求登录信息
  const { data, loading, runAsync } = useRequest(postLogin, { manual: true });
  useAsyncEffect(async () => {
    const res = await runAsync({
      userName: "test",
      passWord: "123456",
      jwtToken: "string",
      refreshToken: "string",
      hash: "string",
      code: "1234",
      uuid: "81dc9bdb52d04dc20036dbd8313ed055",
    });
    if (res) {
      setUserInfo(res.data);
    }
  }, []);
  return (
    <Box sx={{ my: 4 }}>
      {loading ? "" : props.children}
      <ProTip />
    </Box>
  );
}

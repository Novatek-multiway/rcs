import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ProTip from "./ProTip";
import { postLogin } from "apis";
import { useRequest } from "ahooks";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App(props: any) {
  // 请求登录信息
  const { data, loading, run } = useRequest(postLogin, { manual: true });
  React.useEffect(() => {
    const res = run({
      userName: "test",
      passWord: "123456",
      jwtToken: "string",
      refreshToken: "string",
      hash: "string",
      code: "1234",
      uuid: "81dc9bdb52d04dc20036dbd8313ed055",
    });
    if (res) {
      console.log(res);
    }
  }, []);
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI Vite.js example in TypeScript
        </Typography>
        {props.children}
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}

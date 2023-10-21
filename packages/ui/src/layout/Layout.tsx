import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import type { FC } from "react";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
// import { theme } from "theme";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: "首页", link: "/system" },
  { name: "数据表格", link: "/system/data-table" },
];

const Layout: FC<LayoutProps> = (props) => {
  const navagate = useNavigate();
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", height: "100%", flexDirection: "column" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              MUI
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  sx={{ color: "#fff" }}
                  onClick={() => navagate(item.link)}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: 3, mt: theme.spacing(8) }}>
          {props?.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default memo(Layout);

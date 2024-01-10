import {
  AppBar,
  Box,
  Container,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import React from "react";

import Content from "./components/content";
const DashboardStyled = styled(Container)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "0px !important",
});
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00d1d1",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: "100% !important",
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          justifyContent: "space-around",
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: "#000",
          "&.Mui-selected": {
            color: "#00d1d1", // 自定义选中项的颜色
          },
        },
      },
    },
  },
});

function Index() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <DashboardStyled>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              四向穿控制系统
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            padding: theme.spacing(2.5),
            overflow: "scroll",
          }}
        >
          <Content />
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
          <Tab label="Item Six" />
          <Tab label="Item Seven" />
          <Tab label="Item Six" />
          <Tab label="Item Seven" />
        </Tabs>
      </DashboardStyled>
    </ThemeProvider>
  );
}

export default Index;

import { Box, Grid, styled, Typography } from "@mui/material";
import { animated } from "@react-spring/web";
import React, { useMemo } from "react";

import GlobalPanel from "@/components/GlobalPanel";

import Status from "./status";

const StyleGrid = styled(animated(Grid))(({ open }) => ({
  opacity: open ? 1 : 0.4,
  transform: open
    ? "perspective(100px) rotateY(0deg)"
    : "perspective(100px) rotateY(1deg) ",
  transformOrigin: "left center",
  transition: "all 0.5s ease",
}));
const About = () => {
  const Item = styled(Box)(() => ({
    background: "#445260",
    padding: "0px!important",
    textAlign: "center",
    color: "#fff",
    height: "100%",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    "&& p": {
      padding: "0",
      margin: "0",
      fontSize: "20px",
    },
  }));
  const PsBox = styled(Box)(() => ({
    position: "absolute",
    width: "100%",
    left: 0,
    bottom: "-10px",
    textAlign: "center",
  }));
  const BottomTypography = styled(Typography)(() => ({
    color: "#3D3D3D",
  }));
  const data = [
    {
      title: "车辆编号",
      states: "137",
    },
    {
      title: "车辆类型",
      states: "堆垛车",
    },
    {
      title: "叉臂类型",
      states: "托盘车",
    },
    {
      title: "底盘",
      states: "单舵",
    },
    {
      title: "常规保养",
      states: "1",
    },
    {
      title: "额外保养",
      states: "1",
    },
  ];
  const nodeListDom = useMemo(() => {
    return data?.map((item: any) => {
      return (
        <Box
          sx={{
            width: "25%",
            height: "50%",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "flex-end",

            border: "1px solid rgb(216 216 216 / 20%)",
            borderTop: "none",
            borderLeft: "none",
            "&& p": {
              fontSize: "30px",
              lineHeight: "1",
            },
            "&& span": {
              fontSize: "20px",
              color: "#ffffff80",
              margin: "20px 0 30px ",
            },
            ":nth-child(4)": {
              borderRight: "none",
            },
            ":nth-of-type(n+5)": {
              borderBottom: "none",
              "&& p": { fontSize: "50px" },
            },
            ":first-child": {
              "&& p": { fontSize: "50px" },
            },
            ":last-child": {
              borderRight: "none",
            },
          }}
        >
          <p>{item.states}</p>
          <span>{item.title}</span>
        </Box>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [open, setOpen] = React.useState(false);
  const [startAnimate, setStartAnimate] = React.useState(false);
  return (
    <>
      <StyleGrid
        container
        spacing={2.5}
        sx={{ height: "calc(100% + 20px)" }}
        open={!startAnimate}
      >
        <Grid item xs={12} md={4} sx={{ height: "50%" }}>
          <GlobalPanel delay={100} direction="left">
            <Status />
          </GlobalPanel>
        </Grid>
        <Grid item xs={12} md={8} sx={{ height: "50%" }}>
          <GlobalPanel delay={250} direction="up">
            <Item
              sx={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignContent: "stretch",
                alignItems: "baseline",
                padding: "20px",
              }}
            >
              <p style={{ width: "100%", textAlign: "left" }}>信息统计及预警</p>

              <Grid
                xs={4}
                sx={{
                  position: "relative",
                }}
              >
                <PsBox>
                  <BottomTypography sx={{ fontSize: "20px", color: "#fff" }}>
                    {"运行时间"}
                  </BottomTypography>
                  <Typography
                    sx={{
                      fontSize: "16px!important",
                      color: "rgb(255 255 255)",
                    }}
                  >
                    Max {110} Hours
                  </Typography>
                </PsBox>
              </Grid>
              <Grid
                xs={4}
                sx={{
                  position: "relative",
                }}
              >
                <PsBox>
                  <BottomTypography sx={{ fontSize: "20px", color: "#fff" }}>
                    {"系统天数"}
                  </BottomTypography>
                  <Typography
                    sx={{
                      fontSize: "16px!important",
                      color: "rgb(255 255 255)",
                    }}
                  >
                    Max {365} Days
                  </Typography>
                </PsBox>
              </Grid>
              <Grid
                xs={4}
                sx={{
                  position: "relative",
                }}
              >
                <PsBox>
                  <BottomTypography sx={{ fontSize: "20px", color: "#fff" }}>
                    {"公里数"}
                  </BottomTypography>
                  <Typography
                    sx={{
                      fontSize: "16px!important",
                      color: "rgb(255 255 255)",
                    }}
                  >
                    Max {5000} Km
                  </Typography>
                </PsBox>
              </Grid>
            </Item>
          </GlobalPanel>
        </Grid>
        <Grid item xs={8} sx={{ height: "50%" }}>
          <GlobalPanel delay={350} direction="up">
            <Item
              sx={{
                padding: "20px",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              {nodeListDom}
            </Item>
          </GlobalPanel>
        </Grid>
        <Grid item xs={4} sx={{ height: "50%" }}>
          <GlobalPanel delay={450} direction="left">
            <Item
              sx={{
                "&& .MuiSvgIcon-root": {
                  width: "90px!important",
                  height: "auto!important",
                },
              }}
              onClick={() => {
                setOpen(true);
                setStartAnimate(true);
              }}
            >
              <p style={{ fontSize: "30px", marginTop: "24px" }}>异常查询</p>
            </Item>
          </GlobalPanel>
        </Grid>
      </StyleGrid>
    </>
  );
};

export default About;

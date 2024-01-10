import "swiper/css";
import "swiper/css/pagination";

import { Box, Grid, styled, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useGlobaltore } from "../../store/global";
import AppBox from "../AppBox";
import AboutIcon from "../SvgIcon/AboutIcon";
import CloudIcon from "../SvgIcon/CloudIcon";
import CollectionIcon from "../SvgIcon/Collection";
import IoSIcon from "../SvgIcon/IoSIcon";
import NavigateIcon from "../SvgIcon/NavigateIcon";
import OffsetIcon from "../SvgIcon/OffsetIcon";
import OnlineIcon from "../SvgIcon/OnlineIcon";
import SettingIcon from "../SvgIcon/SettingIcon";
const ChildGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default function App() {
  const theme = useTheme();
  const { setDialogOpen, setClickPoints, apps, setActiveApp } = useGlobaltore(
    (state) => state
  );
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
      >
        <SwiperSlide>
          <Box sx={{ height: "100%", width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              sx={{
                height: "100%",
                padding: theme.spacing(10),
              }}
              columnSpacing={{ xs: 2, sm: 4, md: 5 }}
            >
              {apps.map((item, index) => (
                <ChildGrid
                  item
                  key={index}
                  xs={3}
                  onClick={(event) => {
                    setClickPoints({
                      x: event.clientX,
                      y: event.clientY,
                    });
                    setTimeout(() => {
                      setActiveApp(item.name);
                      setDialogOpen();
                    }, 200);
                  }}
                >
                  <AppBox title={item.title}>
                    {item.name === "Settings" && <SettingIcon />}
                    {item.name === "Collection" && <CollectionIcon />}
                    {item.name === "Cloud" && <CloudIcon fontSize={180} />}
                    {item.name === "About" && <AboutIcon />}
                    {item.name === "Online" && <OnlineIcon />}
                    {item.name === "Navigate" && <NavigateIcon />}
                    {item.name === "Offset" && <OffsetIcon />}
                    {item.name === "IOSignal" && <IoSIcon />}
                  </AppBox>
                </ChildGrid>
              ))}
            </Grid>
          </Box>
        </SwiperSlide>
        <SwiperSlide></SwiperSlide>
      </Swiper>
    </>
  );
}

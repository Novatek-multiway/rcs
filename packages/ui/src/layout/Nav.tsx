import { Assignment, Event, ModeStandby, Monitor, People, Place, Power, Warehouse } from '@mui/icons-material'
import { ListItemIcon, ListItemText, Menu, MenuItem, SvgIcon, Tab, Tabs } from '@mui/material'
import type { FC } from 'react'
import React, { memo, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface NavItem {
  name: string
  link: string
  icon: React.JSX.Element
  children?: NavItem[]
}

// TODO 进入监控页面菜单UI问题
const navItems: NavItem[] = [
  { name: '监控', link: '/micro-dashboard', icon: <Monitor fontSize="small" /> },
  { name: '任务', link: '/micro-data-management/assignment', icon: <Assignment fontSize="small" /> },
  {
    name: '车辆',
    link: '/micro-data-management/vehicle',
    icon: (
      <SvgIcon fontSize="small">
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1629"
          width="200"
          height="200"
        >
          <path
            d="M686.993297 600.672865v268.966054a60.014703 60.014703 0 0 1-60.000865 60.014703H387.224216a60.014703 60.014703 0 0 1-60.014702-60.014703V600.672865h359.783783zM411.205189 2.518486a42.482162 42.482162 0 0 1 42.482162 42.482163v517.396756h-84.964324V44.986811a42.482162 42.482162 0 0 1 42.482162-42.482162z m183.351352 0a42.482162 42.482162 0 0 1 42.482162 42.482163v517.396756h-84.964325V44.986811a42.482162 42.482162 0 0 1 42.482163-42.482162z"
            fill="currentColor"
            p-id="1630"
          ></path>
          <path
            d="M770.020324 763.599568v129.051675a120.029405 120.029405 0 0 1-120.015567 120.029406H364.211892a120.029405 120.029405 0 0 1-120.029406-120.029406v-129.051675h44.557838v124.706594a90.028973 90.028973 0 0 0 86.804757 89.959784l3.224216 0.055351h256.678054a90.015135 90.015135 0 0 0 90.015135-90.015135v-124.706594h44.557838z"
            fill="currentColor"
            p-id="1631"
          ></path>
        </svg>
      </SvgIcon>
    )
  },
  {
    name: '统计',
    link: '/micro-data-management/stats',
    icon: (
      <SvgIcon fontSize="small">
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4578"
          width="200"
          height="200"
        >
          <path
            d="M0 0h95.104l6.784 932.8H1024V1024H0V0z m192 729.6l-64-57.024 262.592-302.912L639.424 570.88 950.592 128 1024 176.32l-366.72 524.032L404.672 497.28 192 729.536z"
            p-id="4579"
            fill="currentColor"
          ></path>
        </svg>
      </SvgIcon>
    ),
    children: [
      {
        name: '车辆运行数据统计',
        link: '/micro-data-management/stats/vehicle-operation',
        icon: (
          <SvgIcon fontSize="small">
            <svg
              viewBox="0 0 1170 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="12223"
              width="200"
              height="200"
            >
              <path
                d="M528.384 965.851429H0V0.073143h1099.410286v268.653714h-64V67.949714H64.073143v830.025143h464.310857z"
                fill="currentColor"
                p-id="12224"
              ></path>
              <path
                d="M1099.410286 302.665143H0V0h1099.410286v302.665143zM64.073143 234.788571h971.337143V67.876571H64.073143V234.788571zM152.137143 475.209143h333.165714v67.876571H152.137143v-67.876571z m0 174.592h266.459428v67.876571H152.137143v-67.876571zM696.832 553.398857h64.073143v288.914286h-64.073143v-288.914286z m133.558857 73.947429h64v215.04h-64v-215.04z m133.485714 106.496h64.073143v108.544h-64.073143v-108.544z"
                fill="currentColor"
                p-id="12225"
              ></path>
              <path
                d="M862.354286 1024c-146.870857 0-273.334857-110.006857-302.006857-262.729143-28.598857-152.722286 48.493714-305.590857 184.173714-365.202286 135.68-59.611429 292.205714-9.289143 373.833143 120.173715 81.627429 129.462857 65.609143 302.08-38.253715 412.16A297.325714 297.325714 0 0 1 862.427429 1024z m0-584.850286c-134.436571 0-243.785143 116.004571-243.785143 258.486857 0 142.482286 109.348571 258.486857 243.858286 258.486858 134.436571 0 243.785143-116.004571 243.785142-258.486858 0-142.555429-109.348571-258.486857-243.785142-258.486857z"
                fill="currentColor"
                p-id="12226"
              ></path>
            </svg>
          </SvgIcon>
        )
      }
    ]
  },
  {
    name: '配置',
    link: '/micro-data-management/configuration',
    icon: (
      <SvgIcon fontSize="small">
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6429"
          width="200"
          height="200"
        >
          <path
            d="M798.72 817.152c-57.344-10.24-102.4-59.392-102.4-120.832 0-67.584 55.296-122.88 122.88-122.88s122.88 55.296 122.88 122.88c0 61.44-45.056 110.592-102.4 120.832v114.688c0 12.288-8.192 20.48-20.48 20.48s-20.48-8.192-20.48-20.48v-114.688z m-614.4 0c-57.344-10.24-102.4-59.392-102.4-120.832 0-67.584 55.296-122.88 122.88-122.88s122.88 55.296 122.88 122.88c0 61.44-45.056 110.592-102.4 120.832v114.688c0 12.288-8.192 20.48-20.48 20.48s-20.48-8.192-20.48-20.48v-114.688z m307.2-610.304c-57.344 10.24-102.4 59.392-102.4 120.832 0 67.584 55.296 122.88 122.88 122.88s122.88-55.296 122.88-122.88c0-61.44-45.056-110.592-102.4-120.832v-114.688c0-12.288-8.192-20.48-20.48-20.48s-20.48 8.192-20.48 20.48v114.688z m-307.2-114.688c0-12.288 8.192-20.48 20.48-20.48s20.48 8.192 20.48 20.48v409.6c0 12.288-8.192 20.48-20.48 20.48s-20.48-8.192-20.48-20.48v-409.6z m614.4 0c0-12.288 8.192-20.48 20.48-20.48s20.48 8.192 20.48 20.48v409.6c0 12.288-8.192 20.48-20.48 20.48s-20.48-8.192-20.48-20.48v-409.6z m-286.72 317.44c-45.056 0-81.92-36.864-81.92-81.92s36.864-81.92 81.92-81.92 81.92 36.864 81.92 81.92-36.864 81.92-81.92 81.92z m-20.48 112.64c0-12.288 8.192-20.48 20.48-20.48s20.48 8.192 20.48 20.48v409.6c0 12.288-8.192 20.48-20.48 20.48s-20.48-8.192-20.48-20.48v-409.6z m-286.72 256c45.056 0 81.92-36.864 81.92-81.92s-36.864-81.92-81.92-81.92-81.92 36.864-81.92 81.92 36.864 81.92 81.92 81.92z m614.4 0c45.056 0 81.92-36.864 81.92-81.92s-36.864-81.92-81.92-81.92-81.92 36.864-81.92 81.92 36.864 81.92 81.92 81.92z"
            fill="currentColor"
            p-id="6430"
          ></path>
        </svg>
      </SvgIcon>
    ),
    children: [
      {
        name: '地图配置',
        link: '/micro-data-management/configuration/map',
        icon: <Warehouse fontSize="small" />
      },
      {
        name: '车型配置',
        link: '/micro-data-management/configuration/vehicle-type',
        icon: (
          <SvgIcon fontSize="small">
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="14969"
              width="200"
              height="200"
            >
              <path
                d="M58.304 754.944c0 116.416 94.4 210.816 210.816 210.816s210.816-94.4 210.816-210.816L479.936 544.128 269.056 544.128C152.64 544.128 58.304 638.528 58.304 754.944zM403.392 754.944c0 74.112-60.288 134.336-134.336 134.336s-134.336-60.288-134.336-134.336 60.288-134.336 134.336-134.336l134.336 0L403.392 754.944zM965.696 269.056c0-116.416-94.4-210.816-210.816-210.816-116.416 0-210.816 94.4-210.816 210.816l0 210.816 210.816 0C871.36 479.872 965.696 385.472 965.696 269.056zM620.544 269.056c0-74.112 60.288-134.336 134.336-134.336s134.336 60.288 134.336 134.336c0 74.112-60.288 134.336-134.336 134.336L620.544 403.392 620.544 269.056zM269.056 479.872l210.816 0L479.872 269.056c0-116.416-94.4-210.816-210.816-210.816-116.416 0-210.816 94.4-210.816 210.816C58.304 385.472 152.64 479.872 269.056 479.872zM269.056 134.72c74.112 0 134.336 60.288 134.336 134.336l0 134.336L269.056 403.392c-74.112 0-134.336-60.288-134.336-134.336C134.72 195.008 195.008 134.72 269.056 134.72zM754.944 544.128 544.128 544.128l0 210.816c0 116.416 94.4 210.816 210.816 210.816 116.416 0 210.816-94.4 210.816-210.816S871.36 544.128 754.944 544.128zM754.944 889.28c-74.112 0-134.336-60.288-134.336-134.336L620.608 620.608l134.336 0c74.112 0 134.336 60.288 134.336 134.336S828.992 889.28 754.944 889.28z"
                fill="currentColor"
                p-id="14970"
              ></path>
            </svg>
          </SvgIcon>
        )
      },
      {
        name: '站点配置',
        link: '/micro-data-management/configuration/point',
        icon: <Place fontSize="small" />
      },
      {
        name: '事件配置',
        link: '/micro-data-management/configuration/event',
        icon: <Event fontSize="small" />
      },
      {
        name: '充电配置',
        link: '/micro-data-management/configuration/charge',
        icon: <Power fontSize="small" />
      },
      {
        name: '待命点配置',
        link: '/micro-data-management/configuration/stand-by-point',
        icon: <ModeStandby fontSize="small" />
      },
      {
        name: '用户配置',
        link: '/micro-data-management/configuration/user',
        icon: <People fontSize="small" />
      }
    ]
  }
]

const Nav: FC = () => {
  const navigate = useNavigate()

  const [activeTabIndex, setActiveTabIndex] = React.useState(0) // 当前选中的Tab索引
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTabIndex(newValue)
    setSelectedMenuItemIndex(-1)
  }

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null) // 当前菜单的锚点元素

  const handleCloseMenu = () => {
    console.log(anchorEl)
    anchorEl && setAnchorEl(null)
  }

  const menuOpen = Boolean(anchorEl)
  const [menuOpenedTabIndex, setMenuOpenedTabIndex] = useState(-1) // 当前显示菜单的Tab索引
  const [menuList, setMenuList] = useState<typeof navItems>([]) // 当前菜单列表
  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState(-1)

  const location = useLocation()

  useEffect(() => {
    const activeTabIndex = navItems.findIndex((navItem) => location.pathname.includes(navItem.link))
    if (activeTabIndex !== -1) {
      setActiveTabIndex(activeTabIndex)
      if (navItems[activeTabIndex].children?.length) {
        const menus = navItems[activeTabIndex].children!
        const selectedMenuItemIndex = menus.findIndex((menu) => menu.link === location.pathname)
        if (selectedMenuItemIndex !== -1) setSelectedMenuItemIndex(selectedMenuItemIndex)
      }
    }
  })

  useEffect(() => {
    window.addEventListener('click', handleCloseMenu, true)

    return () => {
      window.removeEventListener('click', handleCloseMenu, true)
    }
  }, [anchorEl])

  return (
    <>
      <Tabs value={activeTabIndex} onChange={handleChange}>
        {navItems.map((tab, index) => (
          <Tab
            key={tab.name}
            sx={{
              color: '#fff',
              minHeight: '48px',
              padding: '0 16px',
              '.MuiTab-iconWrapper': {
                marginBottom: '2px'
              }
            }}
            onClick={() => navigate(tab.link)}
            onMouseEnter={(e) => {
              if (tab.children?.length) {
                setAnchorEl(e.currentTarget)
                setMenuList(tab.children)
                setMenuOpenedTabIndex(index)
              } else {
                handleCloseMenu()
              }
            }}
            icon={tab.icon}
            label={tab.name}
          ></Tab>
        ))}
      </Tabs>
      <Menu
        open={menuOpen}
        disablePortal
        hideBackdrop
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        sx={{
          '&.MuiModal-root': {
            zIndex: -1
          }
        }}
      >
        {menuList.map((menu, index) => (
          <MenuItem
            key={menu.name}
            selected={selectedMenuItemIndex === index}
            onClick={() => {
              setActiveTabIndex(menuOpenedTabIndex)
              setSelectedMenuItemIndex(index)
              navigate(menu.link)
            }}
          >
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText>{menu.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default memo(Nav)

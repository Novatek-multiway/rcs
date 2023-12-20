import { ListItemIcon, ListItemText, Menu, MenuItem, Tab, Tabs } from '@mui/material'
import type { FC } from 'react'
import React, { memo, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export interface NavItem {
  name: string
  link: string
  icon: React.JSX.Element
  children?: NavItem[]
}

export interface INavProps {
  navItems: NavItem[]
}
const Nav: FC<INavProps> = (props) => {
  const { navItems } = props
  const navigate = useNavigate()

  const [activeTabIndex, setActiveTabIndex] = React.useState(0) // 当前选中的Tab索引
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const navItem = navItems[newValue]
    if (navItem.children?.length) {
      setAnchorEl(event.currentTarget as HTMLElement)
      setMenuList(navItem.children)
      setMenuOpenedTabIndex(newValue)
    } else {
      navigate(navItem.link)
      setActiveTabIndex(newValue)
    }
    setSelectedMenuItemIndex(-1)
  }

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null) // 当前菜单的锚点元素

  const handleCloseMenu = () => {
    anchorEl && setAnchorEl(null)
  }

  const menuOpen = Boolean(anchorEl)
  const [menuOpenedTabIndex, setMenuOpenedTabIndex] = useState(-1) // 当前显示菜单的Tab索引
  const [menuList, setMenuList] = useState<typeof navItems>([]) // 当前菜单列表
  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState(-1)

  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') navigate('/micro-dashboard')
    const findIndex = navItems.findIndex((navItem) => location.pathname.includes(navItem.link))
    setActiveTabIndex(findIndex)
    if (navItems[findIndex]?.children?.length) {
      const findSelectedMenuItemIndex = navItems[findIndex].children!.findIndex((navItem) =>
        location.pathname.includes(navItem.link)
      )
      setSelectedMenuItemIndex(findSelectedMenuItemIndex)
    }
  }, [location])

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

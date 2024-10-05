import React, { useEffect, useState } from 'react'
import {
  Groups2Outlined, ChevronLeft, ChevronRightOutlined,
  HomeOutlined, ShoppingCartOutlined, ReceiptLongOutlined, PointOfSaleOutlined,
  TodayOutlined, CalendarMonthOutlined, TrendingUpOutlined, PieChartOutlineOutlined,
  PublicOutlined, AdminPanelSettingsOutlined, SettingsOutlined
} from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import FlexBetween from './FlexBetween'
import profileImg from '../assets/profile.jpg'

const navItems = [
  {
    id: 1,
    text: 'Dashboard',
    icon: <HomeOutlined />
  },
  {
    id: 2,
    text: 'Client Facing',
    icon: null
  }, {
    id: 3,
    text: 'Products',
    icon: <ShoppingCartOutlined />
  }, {
    id: 4,
    text: 'Customers',
    icon: <Groups2Outlined />
  }, {
    id: 5,
    text: 'Transaction',
    icon: <ReceiptLongOutlined />
  }, {
    id: 6,
    text: 'Geography',
    icon: <PublicOutlined />
  }, {
    id: 7,
    text: 'Sales',
    icon: null
  }, {
    id: 8,
    text: 'Overview',
    icon: <PointOfSaleOutlined />
  }, {
    id: 9,
    text: 'Daily',
    icon: <TodayOutlined />
  }, {
    id: 10,
    text: 'Monthly',
    icon: <CalendarMonthOutlined />
  }, {
    id: 11,
    text: 'Breakdown',
    icon: <PieChartOutlineOutlined />
  },
  {
    id: 12,
    text: 'Management',
    icon: null
  }, {
    id: 13,
    text: 'Admin',
    icon: <AdminPanelSettingsOutlined />
  }, {
    id: 14,
    text: 'Performance',
    icon: <TrendingUpOutlined />
  }
]

function SideBar({ user, isNonMobile, drawerWidth, isSidebarOpen, setIsSidebarOpen }) {
  const location = useLocation()
  const [active, setActive] = useState("")
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    setActive(location.pathname.substring(1))
  }, [location.pathname])

  return (
    <Box component='nav' bgcolor={'green'}>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant='permanent'
          anchor='left'
          sx={{
            width: drawerWidth,
            transition: 'ease-in-out',
            // pr: 20,
            '& .MuiPaper-root': {
              color: theme.palette.secondary[200],
              bgcolor: theme.palette.background.alt,
              boxSizing: 'border-box',
              borderWidth: isNonMobile ? 0 : '2px',
              width: drawerWidth,
            }
          }}
        >
          <Box width='100%'>
            <Box m='1rem 2rem 1rem 3rem'>
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display='flex' alignItems='center' gap='0.5rem'>
                  <Typography variant='h4' fontWeight='bold'>ECOMVISION</Typography>
                </Box>
                {/* {!isNonMobile && ( */}
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <ChevronLeft />
                </IconButton>
                {/* )} */}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map((item) => {
                if (!item.icon) {
                  return (
                    <Typography key={item.id} sx={{ m: '1rem 0rem 0rem 3rem' }}>
                      {item.text}
                    </Typography>
                  )
                }
                const lcText = item.text.toLowerCase()
                return (
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`)
                        setActive(lcText)
                      }}
                      sx={{
                        bgcolor: active === lcText ? theme.palette.secondary[300] : 'transparent',
                        color: active === lcText
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100]
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: '2rem',
                          color: active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200]
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: 'auto' }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                )

              })}
            </List>
          </Box>

          <Box m='2rem 0' >
            <Divider />
            <FlexBetween textTransform='none' gap='1rem' m='1.5rem 2rem 0rem 1rem'>
              <Box
                component='img'
                alt='profile'
                src={profileImg}
                height='30%'
                width='30%'
                borderRadius='50%'
                sx={{ objectFit: 'cover' }}
              />
              <Box textAlign='left'>
                <Typography fontWeight='bold' fontSize='0.9rem' color={theme.palette.secondary[100]}>
                  {user.name}
                </Typography>
                <Typography fontSize='0.8rem' color={theme.palette.secondary[200]}>
                  {user.occupation}
                </Typography>
              </Box>
              <IconButton><SettingsOutlined/></IconButton>
            </FlexBetween>



          </Box >



        </Drawer>
      )}
    </Box>
  )
}

export default SideBar

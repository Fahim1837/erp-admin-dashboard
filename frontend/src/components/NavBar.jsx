import React, { useState } from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, SettingsOutlined, Search as SearchIcon, ArrowDropDownOutlined } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useTheme } from '@mui/material'
import FlexBetween from './FlexBetween'
import { setMode } from 'features/globalSlice'
import profileImg from '../assets/profile.jpg'


function NavBar({ user, isSidebarOpen, setIsSidebarOpen }) {
  const dispatch = useDispatch()
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <AppBar sx={{
      position: 'static',
      background: 'none',
      boxShadow: 'none',
    }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}><MenuIcon /></IconButton>
          <FlexBetween
            bgcolor={theme.palette.background.alt}
            borderRadius='9px'
            gap='1rem'
            p='0.1rem 1.5rem'
            width='80%'
            mr='20%'
          >
            <InputBase placeholder='Search...' />
            <IconButton><SearchIcon /></IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap='1.5rem'>
          <IconButton onClick={() => { dispatch(setMode()) }}>
            {theme.palette.mode === 'dark' ? <DarkModeOutlined sx={{ fontSize: '25px' }} /> : <LightModeOutlined sx={{ fontSize: '25px' }} />}
          </IconButton>
          <IconButton ><SettingsOutlined /></IconButton>

          <FlexBetween>
            <Button
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                textTransform: 'none'
              }}
            >
              <Box
                component='img'
                alt='profile'
                src={profileImg}
                height='32px'
                width='32px'
                borderRadius='50%'
                sx={{ objectFit: 'cover' }}
              />
              <Box textAlign='left'>
                <Typography fontWeight='bold' fontSize='0.85rem' color={theme.palette.secondary[100]}>
                  {user.name}
                </Typography>
                <Typography fontSize='0.75rem' color={theme.palette.secondary[200]}>
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: '25px'
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              slotProps={{
                paper: {
                  style: {
                    width: "180px",
                    marginTop: "2px",
                    backgroundColor: theme.palette.background.alt,
                  },
                },

              }}
            >
              <MenuItem
                onClick={() => setAnchorEl(null)}

              >Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
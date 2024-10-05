import { Box, useMediaQuery } from '@mui/material'
import NavBar from 'components/NavBar'
import SideBar from 'components/SideBar'
import { useGetUserQuery } from 'features/api'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

function Layout() {
  const isNonMobile = useMediaQuery ('(min-width:600px)')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const userId = useSelector ((state) => state.global.userId)
  const {data, error} = useGetUserQuery (userId)
  
  return (
    <Box display={isNonMobile ? 'flex' : 'block'}  width= '100%' height='100%'>
        <SideBar user = { data || {}} isNonMobile={isNonMobile} drawerWidth= '250px' isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        {/* <SideBar2/> */}
      <Box flexGrow={1}>
        <NavBar user = {data || {}} isSidebarOpen = {isSidebarOpen} setIsSidebarOpen = {setIsSidebarOpen}/>
        <Outlet/>
      </Box>
    </Box>
  )
}

export default Layout
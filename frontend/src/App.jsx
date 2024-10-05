import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Admin from 'scenes/admin'
import Breakdown from 'scenes/breakdown'
import Customers from 'scenes/customers'
import Daily from 'scenes/daily'
import Dashboard from 'scenes/dashboard'
import Geography from 'scenes/geography'
import Layout from 'scenes/layout'
import Monthly from 'scenes/monthly'
import Overview from 'scenes/overview'
import Performance from 'scenes/performance'
import Products from 'scenes/products'
import Transaction from 'scenes/transaction'
import { themeSettings } from 'themes/theme'

function App() {
  const mode = useSelector ((state) => state.global.mode)
  const theme = useMemo (() => createTheme (themeSettings (mode)), [mode])
  return (
    <div className='app'>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        
        <Routes>
          <Route element= {<Layout/>}>
            <Route path='/' element = {<Navigate to = '/dashboard' replace = {true}/>} />
            <Route path='/dashboard' element = {<Dashboard/>} />
            <Route path='/products' element = {<Products/>} />
            <Route path='/customers' element = {<Customers/>} />
            <Route path='/transaction' element = {<Transaction/>} />
            <Route path='/geography' element = {<Geography/>} />
            <Route path='/overview' element = {<Overview/>} />
            <Route path='/daily' element = {<Daily/>} />
            <Route path='/monthly' element = {<Monthly/>} />
            <Route path='/breakdown' element = {<Breakdown/>} />
            <Route path='/admin' element = {<Admin/>} />
            <Route path='/performance' element = {<Performance/>} />
          </Route>
        </Routes>
      </ThemeProvider>
      
      </BrowserRouter>
    </div>
  )
}

export default App
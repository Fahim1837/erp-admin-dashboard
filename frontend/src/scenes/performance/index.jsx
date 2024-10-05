import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'
import Header from 'components/Header'
import { useGetPerformanceQuery } from 'features/api'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function Performance() {
  const theme = useTheme()
  const userId = useSelector ((state) => state.global.userId)
  const { data, isLoading } = useGetPerformanceQuery(userId)

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Price",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='performance' subtitle='Track Your Affiliate Sales Performance Here' />
      <Box mt={'20px'} height='70vh' width='100%'
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            bgcolor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            bgcolor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          isLoading={isLoading || !data}
          rows={(data && data.sales) || []}
          getRowId={(row) => row._id}
          columns={columns}
          slots={{
            toolbar: DataGridCustomToolbar
          }}
        />
      </Box>
    </Box>
  )
}

export default Performance
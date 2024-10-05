import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'
import Header from 'components/Header'
import { useGetAdminsQuery } from 'features/api'
import React, { useState } from 'react'

function Admin() {
  const theme = useTheme()

  const { data, isLoading } = useGetAdminsQuery()

  const columns = [
    {
      field: '_id',
      type: 'string',
      headerName: 'ID',
      flex: 1
    },
    {
      field: 'name',
      type: 'string',
      headerName: 'Name',
      flex: 0.8
    },
    {
      field: 'email',
      type: 'string',
      headerName: 'Email',
      flex: 1
    },
    {
      field: 'phoneNumber',
      type: 'string',
      headerName: 'Phone Number',
      flex: 1,
      sortable: false,
    },
    {
      field: 'country',
      type: 'string',
      headerName: 'Country',
      flex: 1
    },
    {
      field: 'occupation',
      type: 'string',
      headerName: 'Occupation',
      flex: 1
    },
    {
      field: 'role',
      type: 'string',
      headerName: 'Role',
      flex: 1
    },

  ]

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='admins' subtitle='Managing Admins and List of Admins' />
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
          rows={data || []}
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

export default Admin
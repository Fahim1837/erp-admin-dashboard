import { Box, useTheme } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import DataGridCustomToolbar from "components/DataGridCustomToolbar"
import Header from "components/Header"
import { useGetTransactionQuery } from "features/api"
import { useState } from "react"


// FIXME: Transaction section need to be revised again 
function Transaction() {
  const theme = useTheme ()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState('')

  const { data, isLoading } = useGetTransactionQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search
  })

  const columns = [
    {
      field: '_id',
      type: 'string',
      headerName: 'ID',
      flex: 1
    },
    {
      field: 'userId',
      type: 'string',
      headerName: 'User ID',
      flex: 0.8
    },
    {
      field: 'createdAt',
      type: 'string',
      headerName: 'Created At',
      flex: 1
    },
    {
      field: 'products',
      type: 'string',
      headerName: '# of Products',
      flex: 1,
      sortable: false,
      renderCell: (params) => params.value.length
    },
    {
      field: 'cost',
      type: 'string',
      headerName: 'Cost',
      flex: 0.9,
      renderCell: (params) => `$ ${params.value}`
    }

  ]

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='TRANSACTIONS' subtitle='Entire list of transactions' />
      <Box mt={'20px'} height= '70vh' width= '100%'
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
          loading = {isLoading || !data}
          getRowId={(row) => row._id}
          rows= {(data && data.transactions) || []}
          columns= {columns}
          pagination = {true}
          page = {page}
          pageSize = {pageSize}
          paginationMode= "server"
          sortingMode= "server"
          slots={ {
            toolbar: DataGridCustomToolbar
          }}
        />
      </Box>
    </Box>
  )
}

export default Transaction
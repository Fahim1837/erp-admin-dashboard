import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Header from 'components/Header'
import { useGetCustomersQuery } from 'features/api'

function Customers() {
  const theme = useTheme ()
  const {data, isLoading} = useGetCustomersQuery()
  const rows = [
    {
      _id: 1,
      name: '@MUI',
      email: '@gmail.com',
      country: 'Bangladesh',
      city: 'Dhaka',
      occupation: 'Job holder',
      role: 'user',

    },
  ];
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
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
      },
    },
    {
      field: 'city',
      type: 'string',
      headerName: 'City',
      flex: 0.9
    },
    {
      field: 'country',
      type: 'string',
      headerName: 'Country',
      flex: 0.4
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
      flex: 0.4
    },
  ]

  console.log(data)
  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='CUSTOMERS' subtitle= 'List of Customers'/>
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
          // "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          //   color: `${theme.palette.secondary[200]} !important`,
          // },
        }}
      >
        <DataGrid
        isLoading = {isLoading || !data}
        rows = {data || []}
        getRowId={(row) => row._id}
        columns={columns}
        />
      </Box>
    </Box>
  )
}

export default Customers
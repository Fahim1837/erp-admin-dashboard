import { Box, useTheme } from '@mui/material'
import Header from 'components/Header'
import { useGetSalesByCategoryQuery } from 'features/api'
import React, { useMemo } from 'react'
import PieChart from './PieChart'

function Breakdown() {
  const theme = useTheme ()
  const {data, isLoading} = useGetSalesByCategoryQuery ()


const output = [
  {
    color: theme.palette.secondary[300]
  },
  {
    color: theme.palette.secondary[400]
  },
  {
    color: theme.palette.secondary[500]
  },
  {
    color: theme.palette.secondary[600]
  }
]

const result =  useMemo (() => {
    if (!isLoading) {
      const formatteddata = Object.entries(data).map(([key, value]) => ({id:key, label: key, value: value})) 
      const updatedData = output.map((item, index) =>   ({ ...item, ...formatteddata[index] }))
      return updatedData
    }
  }, [isLoading])

 

  return (
    <Box m = '1.5rem 2.5rem'>
      <Header title = 'breakdown' subtitle= 'Breakdown of Sales by Category'/>
      <Box
        mt='20px'
        pt='10px'
        height='90vh'
        borderRadius='4px'
        border={`1px solid ${theme.palette.primary[100]}`}
      >
        {!isLoading ? <PieChart data={result} /> : <>Loading...</>}

      </Box>

    </Box>
  )
}

export default Breakdown
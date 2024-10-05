import { Box, useTheme } from '@mui/material'
import Header from 'components/Header'
import { useGetMonthlySalesQuery } from 'features/api'
import React, { useMemo } from 'react'
import DailyChart from 'scenes/daily/DailyChart'

function Monthly() {
  const { data, isLoading } = useGetMonthlySalesQuery()
  const theme = useTheme()

  const unitsData = {
    id: 'Total Units',
    color: theme.palette.primary[200],
    data: []
  }

  const salesData = {
    id: 'Total Sales',
    color: theme.palette.secondary[400],
    data: []
  }

  useMemo(() => {
    console.log(data)
    if (!isLoading) {
      unitsData.data = data.formattedUnits
      salesData.data = data.formattedSales
    }
  }, [data, isLoading])

  console.log([unitsData, salesData])

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title={'monthly sales'} subtitle={'Chart of Monthly Sales'} />
      <Box
        mt='20px'
        pt='10px'
        height='90vh'
        borderRadius='4px'
        border={`1px solid ${theme.palette.primary[100]}`}
      >
        {!isLoading ? <DailyChart data={[unitsData, salesData]} /> : <>Loading...</>}

      </Box>
    </Box>
  )
}

export default Monthly
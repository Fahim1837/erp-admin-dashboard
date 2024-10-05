import { Box, useTheme } from '@mui/material'
import Header from 'components/Header'
import { useGetDailySalesQuery } from 'features/api'
import React, { useMemo, useState } from 'react'
import DatePicker from 'react-datepicker'
import DailyChart from './DailyChart'

function Daily() {
  const [startDate, setStartDate] = useState(new Date('2021-02-01'))
  const [endDate, setEndDate] = useState(new Date('2021-03-01'))
  const { data, isLoading } = useGetDailySalesQuery()
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
    if (!isLoading) {
      data.map((item) => {
        const givenDate = new Date(item.date)
        if (givenDate >= startDate && givenDate <= endDate) {

          salesData.data = [
            ...salesData.data,
            {
              x: item.date.substring(item.date.indexOf('-') + 1),
              y: item.sales
            }
          ]
          console.log(salesData)
          unitsData.data = [
            ...unitsData.data,
            {
              x: item.date.substring(item.date.indexOf('-') + 1),
              y: item.units
            }
          ]

        }
      })
    }
  }, [data, isLoading, startDate, endDate])

  console.log([unitsData, salesData])

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='daily sales' subtitle=' Chart of the Daily Sales' />
      <Box
        mt='20px'
        pt= '10px'
        height='90vh'
        borderRadius='4px'
        border={`1px solid ${theme.palette.primary[100]}`}
      >
        <Box display='flex' justifyContent='flex-end' >
          <Box display='flex' gap='1rem' >
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart={true}
              startDate={startDate}
              endDate={endDate}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}

            />
          </Box>
        </Box>
        {!isLoading ? <DailyChart data= { [unitsData, salesData] } /> : <>Loading...</>}
       
      </Box>
    </Box>
  )
}

export default Daily






{/* <Box display='flex' justifyContent='flex-end' >
          <Box display='flex' gap='1rem' >
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart={true}
              startDate={startDate}
              endDate={endDate}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}

            />
          </Box>
        </Box> */}
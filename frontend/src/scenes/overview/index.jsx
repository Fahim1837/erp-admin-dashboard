import { Box, FormControl, InputLabel, MenuItem, Select, useTheme } from '@mui/material'
import Header from 'components/Header'
import LineChart from 'components/LineChart'
import { useGetSalesQuery } from 'features/api'
import { useEffect, useMemo, useState } from 'react'

function Overview() {
    const theme = useTheme()
    const { data, isLoading } = useGetSalesQuery()
    const [view, setView] = useState('sales')

    const unitsData = [{
        id: 'Total Units',
        color: theme.palette.secondary[600],
    }]
    const salesData = [{
        id: 'Total Sales',
        color: theme.palette.secondary.main,
    }]

    useMemo(() => {
        console.log('data', data, isLoading)
        if (!isLoading) {
            unitsData[0].data = data.unitsChart
            salesData[0].data = data.salesChart
        }
        console.log(unitsData, salesData)
    }, [isLoading, unitsData, salesData]);


    return (
        <Box m='1.5rem 2.5rem'>
            <Header title='overview' subtitle='Overview of general revenue and profit' />
            <Box
                mt='20px'
                height='100vh'
                borderRadius='4px'
                border={`1px solid ${theme.palette.primary[100]}`}
            >
                <FormControl sx={{ m: '1rem', mb: '0rem' }}>
                    <InputLabel>View</InputLabel>
                    <Select
                        sx={{ color: 'white' }}
                        value={view}
                        label='View'
                        onChange={(e) => setView(e.target.value)}
                    >
                        <MenuItem value='sales'>Sales</MenuItem>
                        <MenuItem value='units'>Units</MenuItem>
                    </Select>
                </FormControl>
                {/* {!isLoading ? <LineChart
                    data= { data } /> : <>Loading...</>} */}
                {(isLoading) ? <>Loading....</> : <LineChart data={view === 'units' ? unitsData : salesData} />}
                {/* {isLoading ? <>Loading....</> : <>Done</>} */}
            </Box>
        </Box>
    )
}

export default Overview
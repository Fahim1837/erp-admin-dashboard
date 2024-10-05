import React from 'react'
import Header from 'components/Header'
import { Box, useTheme } from '@mui/material'
import { useGetGeographyQuery } from 'features/api'
import Geopath from './Geopath'

function Geography() {
    const theme = useTheme ()
    const { data } = useGetGeographyQuery ()
    console.log(data)
  return (
    <Box m= '1.5rem 2.5rem'>
        <Header title= 'geography' subtitle='Find where your users are located'/>
        <Box 
            mt = '20px'
            height = '70vh'
            borderRadius = '4px'
            border = {`1px solid ${theme.palette.secondary[200]}`}
        >
            {data ? <Geopath data={data} /> : <>Loading ...</>}
        </Box>
    </Box>
  )
}

export default Geography
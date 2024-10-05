import { Box, Button, Card, CardActions, CardContent, Collapse, Rating, Typography, useMediaQuery, useTheme } from '@mui/material'
import Header from 'components/Header'
import { useGetProductsQuery } from 'features/api'
import React, { useState } from 'react'

function Product({ _id, name, description, price, category, rating, supply, stat }) {
    const theme = useTheme()
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Card sx={{
            bgcolor: theme.palette.background.alt,
            backgroundImage: 'none',
            borderRadius: '0.55rem'
        }}>
            <CardContent>
                <Typography
                    sx={{ fontSize: '14px' }}
                    color={theme.palette.secondary[700]}
                    gutterBottom
                >
                    {category}
                </Typography>
                <Typography variant='h5' component='div'>
                    {name}
                </Typography>
                <Typography
                    sx={{ mb: '1.5rem' }}
                    color={theme.palette.secondary[400]}
                >
                    ${price}
                </Typography>
                <Rating value={rating} readOnly />
                <Typography variant='body2'>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant='x'
                    size='small'
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    See More
                </Button>
            </CardActions>
            <Collapse
                in={isExpanded}
                timeout='auto'
                unmountOnExit
                sx={{ color: theme.palette.neutral[300] }}
            >
                <CardContent>
                    <Typography >id: {_id}</Typography>
                    <Typography >Supply Left: {supply}</Typography>
                    <Typography variant='body1'>Yearly Sales This Year: {stat[0].yearlySalesTotal}</Typography>
                    <Typography variant='body1'>Yearly Units Sold This Year: {stat.yearlyTotalUnitsSold}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}


function Products() {
    const { data, isLoading } = useGetProductsQuery()
    const isNonMobile = useMediaQuery('(min-width:1000px)')

    return (
        <Box m='1.5rem 2.5rem'>
            <Header title='PRODUCTS' subtitle='See your list of products' />
            {data || !isLoading ? (
                <Box
                    mt='20px'
                    display='grid'
                    gridTemplateColumns="repeat(4, 1fr)"
                    justifyContent='space-between'
                    rowGap='20px'
                    columnGap='1.33%'
                    sx={{
                        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                    }}
                >
                    {data.map(({
                        _id,
                        name,
                        description,
                        price,
                        category,
                        rating,
                        supply,
                        stat
                    }) =>
                        <Product
                            _id={_id}
                            name={name}
                            description={description}
                            price={price}
                            category={category}
                            rating={rating}
                            supply={supply}
                            stat={stat}
                        />)}
                </Box>
            ) : (
                <Box>
                    Loading...
                </Box>
            )}
        </Box>
    )
}

export default Products
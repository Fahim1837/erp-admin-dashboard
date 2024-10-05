import { useTheme } from '@mui/material'
import { ResponsiveChoropleth } from '@nivo/geo'
import { geoData } from 'features/geoData'
import React from 'react'

function Geopath({ data }) {
    const theme = useTheme()

    return (
        <ResponsiveChoropleth
            data={data}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: theme.palette.secondary[200],
                            strokeWidth: 1
                        }
                    },
                    legend: {
                        text: {
                            fontSize: 11,
                            fill: theme.palette.secondary[200],
                            outlineWidth: 0,
                            outlineColor: "transparent"
                        }
                    },
                    ticks: {
                        line: {
                            stroke: theme.palette.secondary[200],
                            strokeWidth: 1
                        },
                        text: {
                            fontSize: 11,
                            fill: theme.palette.secondary[200],
                            outlineWidth: 0,
                            outlineColor: "transparent"
                        }
                    }
                },
                legends: {
                    text: {
                        fontSize: 14,
                        fill: theme.palette.secondary[200],
                    }
                },
                tooltip: {
                    container: {
                        background: theme.palette.background.alt,
                        color: theme.palette.secondary[500],
                        fontSize: 14
                    }
                }
            }}
            features={geoData.features}
            projectionType='mercator'
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 60]}
            label="properties.name"
            valueFormat="02.0s"
            projectionScale={115}
            projectionTranslation={[0.5, 0.7]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={false}
            borderWidth={0.5}
            borderColor= {theme.palette.primary[100]}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 0,
                    translateY: -20,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemsSpacing: 0,
                    symbolSize: 20,
                    itemDirection: 'left-to-right',
                    itemTextColor: theme.palette.secondary[200],
                    itemOpacity: 0.85,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: theme.palette.secondary[400],
                                itemOpacity: 1,
                                
                                
                            }
                        }
                    ]
                }
            ]}
        />
    )
}

export default Geopath
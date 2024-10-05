import { useTheme } from '@mui/material'
import { ResponsiveLine } from '@nivo/line'
import React from 'react'

function LineChart({data, isDashboard= false}) {
  const theme = useTheme ()
  console.log('lineChart', data)
  const customFormatter = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value;
  };
  return (
    <ResponsiveLine
        data={data}
        margin={{ top: 10, right: 30, bottom: 120, left: 50 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false
        }}
        yFormat= {(v) => (v > 1000) ? `${(v / 1000).toFixed(0)}k` : v}
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            format: (v) => isDashboard ? v.slice(0,3): v,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? '' : 'Month',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            format: (v) => (v > 1000) ? `${(v / 1000).toFixed(0)}k` : v,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0,
            
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={  theme.palette.primary[100] }
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
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
                        fontSize: 12,
                        fontWeight: 700,
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
        legends={ isDashboard ? undefined :[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: -30,
                translateY: -100,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate= {true}
        motionConfig="stiff"
    />
  )
}

export default LineChart
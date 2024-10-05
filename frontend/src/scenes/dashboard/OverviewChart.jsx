import { useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useGetDailySalesQuery } from "features/api";
import { useMemo, useState } from "react";


const OverviewChart = ({ isDashboard = false, view }) => {
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

    if (!data || isLoading) return "Loading...";

    return (
        <ResponsiveLine
            data={view === "sales" ? [salesData] : [unitsData]}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: theme.palette.secondary[200],
                        },
                    },
                    legend: {
                        text: {
                            fill: theme.palette.secondary[200],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: theme.palette.secondary[200],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: theme.palette.secondary[200],
                        },
                    },
                },
                legends: {
                    text: {
                        fill: theme.palette.secondary[200],
                    },
                },
                tooltip: {
                    container: {
                        color: theme.palette.primary.main,
                    },
                },
            }}
            margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
            xScale={{ type: "point" }}
            yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            enableArea={isDashboard}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: (v) => {
                    if (isDashboard) return v.slice(0, 3);
                    return v;
                },
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? "" : "Month",
                legendOffset: 36,
                legendPosition: "middle",
            }}
            axisLeft={{
                orient: "left",
                tickValues: 5,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard
                    ? ""
                    : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
                legendOffset: -60,
                legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={
                !isDashboard
                    ? [
                        {
                            anchor: "bottom-right",
                            direction: "column",
                            justify: false,
                            translateX: 30,
                            translateY: -40,
                            itemsSpacing: 0,
                            itemDirection: "left-to-right",
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemBackground: "rgba(0, 0, 0, .03)",
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]
                    : undefined
            }
        />
    );
};

export default OverviewChart

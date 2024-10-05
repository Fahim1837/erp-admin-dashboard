import { OverallStat } from "../models/overallStat.js"

const getSales = async (req, res) => {
    try {
        const overallStat = await OverallStat.find({}, { monthlyData: 1, _id: 0 })
        const formattedData = overallStat[0].monthlyData.map(item => ({
            month: item.month,
            totalSales: item.totalSales,
            totalUnits: item.totalUnits
        }))
        
        const cumulativeData = []
        formattedData.reduce((acc, curr) => {
            acc.sales = acc.sales + curr.totalSales
            acc.units = acc.units + curr.totalUnits
            cumulativeData.push ({month: curr.month, totalSales: acc.sales, totalUnits: acc.units})
            
            return acc
        }, {sales:0, units:0})
        // console.log(cum1)
        // console.log(cum2)

        const unitsChart = Object.values(cumulativeData).map((value) => ({
            x: value.month, y: value.totalUnits
        }))
        
        const salesChart = Object.values(cumulativeData).map(( value) => ({
            x: value.month, y: value.totalSales
        }))
        
        res.status(200).json({ unitsChart, salesChart })
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

const getDailySales = async (req, res) => {
    try {
        const overallStat = await OverallStat.find({}, { dailyData: 1, _id: 0 })

        const formattedData = overallStat[0].dailyData.map (item => ({
            date: item.date,
            units: item.totalUnits,
            sales: item.totalSales
        }))

        res.status(200).json(formattedData)
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

const getMonthlySales = async (req, res) => {
    try {
        const overallStat = await OverallStat.find({}, { monthlyData: 1, _id: 0 })
        console.log(overallStat)

        const formattedUnits = overallStat[0].monthlyData.map (item => ({
            x: item.month,
            y: item.totalUnits
        }))

        const formattedSales = overallStat[0].monthlyData.map (item => ({
            x: item.month,
            y: item.totalSales
        }))

        res.status(200).json({ formattedUnits, formattedSales })
    }
     
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

const getSalesByCategory = async (req, res) => {
    try {
        const overallStat = await OverallStat.find({}, {_id:0, salesByCategory:1} )
        const output = overallStat[0].salesByCategory
        
        res.status(200).json (output)
    }
    
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

export { getSales, getDailySales, getMonthlySales, getSalesByCategory }
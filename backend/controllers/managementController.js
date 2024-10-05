import mongoose from "mongoose"
import { AffiliateStat } from "../models/affiliateStat.js"
import { User } from "../models/user.js"
import { Transaction } from "../models/transaction.js"

const getAdmins = async (req, res) => {
    try {
        const admin = await User.find({ role: 'admin' }, { password: 0 })

        res.status(200).json(admin)
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }

}

const getUserPerformance = async (req, res) => {
    const { id } = req.params
    console.log('id', id)
    try {
        const userWithStats = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "affiliatestats",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliateStats",
                },
            },
            {
                $unwind: { path: "$affiliateStat", preserveNullAndEmptyArrays: true }
            }
        ])
        const saleTransactions = await Promise.all(
            userWithStats[0].affiliateStats[0].affiliateSales.map((id) => {
                return Transaction.findById(id)
            })
        )
        const filteredSaleTransactions = saleTransactions.filter(
            (transaction) => transaction !== null
        )

        res.status(200).json({ user: userWithStats[0], sales: filteredSaleTransactions })

    } catch (err) {

        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}


export { getAdmins, getUserPerformance }
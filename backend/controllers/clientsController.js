import { Product } from "../models/product.js"
import { ProductStat } from "../models/productStat.js"
import { Transaction } from "../models/transaction.js"
import { User } from "../models/user.js"
import getCountryISO3 from 'country-iso-2-to-3'

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        const productsWithStat = await Promise.all(
            products.map(async (item) => {
                const stat = await ProductStat.find({
                    productId: item._id
                })
                return {
                    ...item._doc,
                    stat
                }
            })
        )
        res.status(200).json(productsWithStat)

    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: 'user' }, { password: 0 })
        res.status(200).json(customers)

    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

const getTransactions = async (req, res) => {
    try {
        const { page = 1, pageSize = 20, sort = null, search = '' } = req.query

        const generateSort = () => {
            const sortParsed = JSON.parse(sort)
            const sortFormatted = {
                [sortParsed.field]: sortParsed.sort == 'asc' ? 1 : -1
            }
            console.log(sortFormatted, 'hi')
            return sortFormatted
        }
        const sortFormatted = Boolean(sort) ? generateSort() : {}

        const transactions = await Transaction.find({
            $or: [
                { cost: { $regex: new RegExp(search, 'i') } },
                { userId: { $regex: new RegExp(search, 'i') } },
            ]
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize)

        const total = await Transaction.countDocuments({
            userId: { $regex: search, $options: 'i' }
        })

        res.status(200).json({ transactions, total })

    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

const getGeography = async (req, res) => {
    try {
        const user = await User.find({}, { name: 1, country: 1 })

        const mappedLocation = user.reduce((acc, curr) => {
            const countryIso3 = getCountryISO3(curr.country)
            if (!acc[countryIso3]) {
                acc[countryIso3] = 0
            }
            acc[countryIso3]++
            return acc
        }, {})

        const formattedLocations = Object.entries(mappedLocation).map(([country, count]) => {
            return { id: country, value: count }
        })

        res.status(200).json(formattedLocations)
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}
export { getProducts, getCustomers, getTransactions, getGeography }
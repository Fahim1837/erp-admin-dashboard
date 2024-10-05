import mongoose from "mongoose"
import color from "cli-color"
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat } from "../data/data1.js"
import { User } from "../models/user.js"
import { Product } from "../models/product.js"
import { ProductStat } from "../models/productStat.js"
import { Transaction } from "../models/transaction.js"
import { OverallStat } from "../models/overallStat.js"
import { AffiliateStat } from "../models/affiliateStat.js"


const mongoConnect = async () => {
    try {
        const url = process.env.MONGO_URL
        await mongoose.connect(url)
        console.log(color.bgMagenta(`Mongodb connected successful `))
        
    //  ONE TIME USE FOR IMPORTING DATA
        // await User.insertMany(dataUser)
        // await Product.insertMany(dataProduct)
        // await ProductStat.insertMany(dataProductStat)
        // await Transaction.insertMany(dataTransaction)
        // await OverallStat.insertMany(dataOverallStat)
        //  await AffiliateStat.insertMany(dataAffiliateStat)
        // await User.collection.drop()
        // await ProductStat.collection.drop()
        // await OverallStat.collection.drop()
        // console.log('All data user inserted') 
    } catch (err) {
        console.log(color.bgRed(err.message))
    }
}

export default mongoConnect
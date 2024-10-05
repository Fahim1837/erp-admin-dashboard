import express from "express";
import { getDailySales, getMonthlySales, getSalesByCategory, getSales } from "../controllers/salesController.js";

const router = express.Router()

router.get ('/overview',getSales )
router.get ('/daily',getDailySales )
router.get ('/monthly',getMonthlySales )
router.get ('/category', getSalesByCategory) 


export default router
// MODULE IMPORTS
import express from "express"
import color from "cli-color"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"

// LOCAL IMPORTS
import clientsRoutes from './routes/clientsRoutes.js'
import generalRoutes from './routes/generalRoutes.js'
import salesRoutes from './routes/salesRoutes.js'
import managementRoutes from './routes/managementRoutes.js'
import mongoConnect from "./config/db.js"


// CONFIGURATION
dotenv.config({path: `./config.env`})
const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// ROUTES
app.use('/api/v1/clients',clientsRoutes)
app.use('/api/v1/general',generalRoutes)
app.use('/api/v1/management',managementRoutes)
app.use('/api/v1/sales',salesRoutes)

app.get('/',  (req, res) => {
    res.send('GET request to homepage')
  })
// SERVER CONNECTION
const port = process.env.PORT || 8001
app.listen(port, () =>{
    mongoConnect()
    console.log(color.bgBlueBright(`Server is running on this port ${port} `))
})


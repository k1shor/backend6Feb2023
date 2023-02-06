const express = require('express')
require('dotenv').config()
require('./database/connection')

// middleware
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
// routes
const TestRoute = require('./routes/testRoute')
const CategoryRoute = require('./routes/categoryRoute')
const ProductRoute = require('./routes/productRoute')
const UserRoute = require('./routes/userRoute')
const OrderRoute = require('./routes/orderRoute')

const app = express()
const port = process.env.PORT



app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

app.use(TestRoute)
app.use('/api',CategoryRoute)
app.use('/api', ProductRoute)
app.use('/api',UserRoute)
app.use('/api',OrderRoute)

app.use('/api/public/uploads', express.static('public/uploads'))

app.listen(port, ()=>{
    console.log(`Server started successfully at port ${port}`)
})
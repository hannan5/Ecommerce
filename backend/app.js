const express = require('express')
const app = express();
const bodyparse = require('body-parser')
const errorMiddleware = require('./Middlewares/error')
const cookieparse = require('cookie-parser')
const cors = require('cors')

//Middleware
app.use(express.json())
app.use(bodyparse.urlencoded({extended:true}))
app.use(bodyparse.json())
app.use(cookieparse())
app.use(cors())

//Middleware For Errors
app.use(errorMiddleware)

// Route
const product = require('./routes/getAllproduct')
const user = require('./routes/userRoutes')
const order = require('./routes/orderRoutes')


app.use('/api/v1', product)
app.use('/api/v1', user)
app.use('/api/v1', order)

// app.use(express.static)
console.log(__dirname);

module.exports = app
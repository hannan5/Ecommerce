const express = require('express')
const app = express();
const bodyparse = require('body-parser')
const errorMiddleware = require('./Middlewares/error')
const cookieparse = require('cookie-parser')


//Middleware
app.use(express.json())
app.use(bodyparse.urlencoded({extended:true}))
app.use(bodyparse.json())
app.use(cookieparse())

//Middleware For Errors
app.use(errorMiddleware)

// Route
const product = require('./routes/getAllproduct')
const user = require('./routes/userRoutes')

app.use('/api/v1', product)
app.use('/api/v1', user)


module.exports = app
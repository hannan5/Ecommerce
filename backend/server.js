const app = require('./app.js');
const connectDB = require('./db/connection.js');
const port = 5000;
require('dotenv').config()

// connect to Database

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
    } catch (error) {
        console.log(error)
    }
}
start()
app.listen(port, () => {
    console.log(`Port is Running on ${port}`)
})
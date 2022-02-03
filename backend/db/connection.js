const mongoose = require('mongoose');

const connectionString = '';

const connectDB = (url) => {
    return mongoose.connect(url)
        .then(() => {
            console.log('Database is Connect')
        })
        .catch((e) => {
            console.log(e);
        })
}
module.exports = connectDB
const mongoose = require('mongoose')
const config = require('../config')

const connectDb = () => {
    const options = {
        autoReconnect: true,
        connectTimeoutMS: 9000
    }
    if (mongoose.connection.readyState != 1) {
        mongoose.connect(config.db_location.local, options)
            .catch(err => "")
    }
}
mongoose.connection.on('disconnected', () => connectDb())
mongoose.connection.on('connected', () => console.log('connected to database'))
mongoose.connection.on('connecting', () => console.log('connecting to database...'))
mongoose.connection.on('reconnected', () => console.log('reconnected to database'))

module.exports = { connect: connectDb }
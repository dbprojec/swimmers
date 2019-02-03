const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SwimmerSchema = new Schema({
    name: String,
    strokes: Object,
    distance: Number,
    time: {
        type: Array        
    },
    birthday: {
        type: Object,
        default: new Date("2-10-2000")
    },
    gender: String,
    score: {
        type: Array
    },
    time_added: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Swimmer", SwimmerSchema)
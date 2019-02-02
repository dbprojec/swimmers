const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SwimmerSchema = new Schema({
    name: String,
    strokes: Object,
    distance: Number,
    time: Number,
    birthday: {
        type: Date,
        default: new Date("2/10/2000")
    },
    gender: String,
    score: {
        type: Object        
    },
    time_added: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Swimmer", SwimmerSchema)
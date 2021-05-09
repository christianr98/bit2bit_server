const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 8,
        max: 255
    },
    detail: {
        type: String,
        required: true,
        min: 8,
        max: 255
    },
    rating: {
        type: Number,
        required: false,
        min: 0,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Question', questionSchema)
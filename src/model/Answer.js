const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
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
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Answer', answerSchema)
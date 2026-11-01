const mongoose = require('mongoose')

const clickSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now},
    userAgent: String,
    ip: String
})

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        trim: true
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    clickHistory: [clickSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, {timestamps: true})

module.exports = mongoose.model('Url', urlSchema)
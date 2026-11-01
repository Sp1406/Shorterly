const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

// Pre-save automatic password hashing
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch(err) {
        next(err)
    }
})

// Comparing passwords during login
userSchema.methods.comparePassword = async function (cPassword) {
    return await bcrypt.compare(cPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
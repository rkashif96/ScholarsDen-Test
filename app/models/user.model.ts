
import mongoose from 'mongoose'
const validator = require('validator')
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Please Enter a Valid Email.']
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.pre('save', async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        next()
    } catch (error: any) {
        console.log(error)
    }
})
export default mongoose.models.UserModel || mongoose.model('UserModel', userSchema)
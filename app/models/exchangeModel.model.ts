import mongoose from 'mongoose'

const exchangeSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true,
    },
    exchangedAmount: {
        type: String,
        required: true,
    }
})

export default mongoose.models.Exchange || mongoose.model('Exchange', exchangeSchema)
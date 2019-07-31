const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Guest Schema
const GuestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('guest', GuestSchema);
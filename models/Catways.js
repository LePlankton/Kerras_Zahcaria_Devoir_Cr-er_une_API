const mongoose = require('mongoose');
const CatwaySchema = new mongoose.Schema({
    catwayNumber: {
        type: Number,
        required: true,
        unique: true
    },
    catwayType: {
        enum: ['long', 'short'],
        type: String,
        required: true
    },
    catwayState: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Catway', CatwaySchema);
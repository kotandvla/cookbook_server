const mongoose = require('mongoose');

var CounterSchema = Schema({
    _id: {
        type: String, 
        required: true
    },
    seq: { 
        type: Number, 
        default: 0 
    }
});

module.exports = mongoose.model('counters', CounterSchema);
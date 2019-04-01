const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    option: String,
    votes: {type: Number, default: 0}
});

const pollSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    question: String,
    options: [optionSchema],
    voters: [{
        type: String
    }],
    voted: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    contractAddress: String,
    chairpersonAdress: String
});

module.exports = mongoose.model('Poll', pollSchema);
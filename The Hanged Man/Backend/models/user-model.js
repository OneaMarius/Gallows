const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    score: {type: String, required: true},
    win: {type: String, required: true},
    lose: {type: String, required: true},
    games: {type: String, required: true},
    rate: {type: String, required: true},

});

module.exports = mongoose.model('User', userSchema);
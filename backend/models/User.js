const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userModel);
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const authSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    mdp: {type: String, required: true},
});
authSchema.plugin(uniqueValidator);

module.exports = mongoose.model('auth', authSchema);

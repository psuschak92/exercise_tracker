require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new Schema({
    username: String
});

const UserModel = mongoose.model('User', UserSchema);

exports.User = UserModel;
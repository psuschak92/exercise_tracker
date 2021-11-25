require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// const ExerciseSchema = require('./ExerciseSchema');

const LogSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: String,
    count: Number,
    logs: [
        {
            description: String,
            duration: Number,
            date: String
        }
    ]
});

const LogModel = mongoose.model('Log', LogSchema);

exports.Log = LogModel;
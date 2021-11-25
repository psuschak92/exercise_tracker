require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const ExerciseSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: String,
    description: String,
    duration: Number,
    date: String
});

const ExerciseModel = mongoose.model('Exercise', ExerciseSchema);

// exports.ExerciseSchema = ExerciseSchema;
exports.Exercise = ExerciseModel;
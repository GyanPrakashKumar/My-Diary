const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myDiary = new Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Diary = mongoose.model('diary', myDiary);
module.exports = Diary;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sentenceSchema = new Schema({
    input_text: String,
    en_sentence: String,
    ko_sentence: String,
    input_code: String,
    keyword: Array,
    register_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('_sentence', sentenceSchema);
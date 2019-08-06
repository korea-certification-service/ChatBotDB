var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
    input_code: String,
    answer_position: String,
    answer_code: String,
    answer_text_en: String,
    answer_text_ko: String,
    answer_action: String,
    register_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('_answer', answerSchema);
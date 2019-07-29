var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
    user_id: String,
    user_tag: String,
    input_text: String,
    en_sentence: String,
    ko_sentence: String,
    input_code: String,
    bot_text: String,
    register_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('_history', historySchema);
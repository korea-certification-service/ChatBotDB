var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var aiSchema = new Schema({
    user_id: String,
    keyword: String,
    dialog_code: String,
    dialog_position: String,
    register_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Ai_answer', aiSchema);
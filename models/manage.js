var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var manageSchema = new Schema({
    sentence_id: String,
    dialog_code: String,
    dialog_position: String,
    answer_id: String,
    admin_id: String,
    status: String,
    register_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('_manage', manageSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var exceptionSchema = new Schema({
    exception_code: String,
    exception_text: String,
    exception_memo: String
});

module.exports = mongoose.model('_exception', exceptionSchema);
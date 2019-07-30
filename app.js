let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors')();
let config = require('./config/config');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors);

// [ CONFIGURE mongoose ]
// CONNECT TO MONGODB SERVER
let db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log(`Connected to mongod server => ${config.db_url}`);
});
mongoose.connect(`mongodb:${config.db_url}`);

//route API
let sentence = require('./routes/sentence');
let answer = require('./routes/answer');
let history = require('./routes/history');
let manage = require('./routes/manage');
let exception = require('./routes/exception');
app.use('/sentence', sentence);
app.use('/answer', answer);
app.use('/history', history);
app.use('/manage', manage);
app.use('/exception', exception);

app.listen(config.port, () => {
    console.log(`Express server has started on port ${config.port}`);
});
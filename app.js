let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors')();
let app = express();
let port = 6001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors);

// [ CONFIGURE mongoose ]
// CONNECT TO MONGODB SERVER
let db = mongoose.connection;
let db_url = "//dev:daiblab123@localhost:11000/bitweb";
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});
mongoose.connect(`mongodb:${db_url}`);

//route API
let sentence = require('./routes/sentence');
let answer = require('./routes/answer');
let history = require('./routes/history');
let manage = require('./routes/manage');
app.use('/sentence', sentence);
app.use('/answer', answer);
app.use('/history', history);
app.use('/manage', manage);

app.listen(port, () => {
    console.log(`Express server has started on port ${port}`);
});
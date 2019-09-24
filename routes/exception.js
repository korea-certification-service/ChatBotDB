let express = require('express');
let router = express.Router();
let Exception = require('../models/exception');
let db = require('../utils/db');

//Create POST API
router.post('/add', (req, res) => {
    let exception = new Exception();
    exception.exception_code = req.body.exception_code;
    exception.exception_text = req.body.exception_text;
    exception.exception_script = req.body.exception_script;
    db.connectDB()
        .then(() => {
            exception.save((err) => {
                if (err) {
                    console.error(err);
                    res.json({
                        result: 0
                    });
                    return;
                }
                res.json({
                    result: 1
                });
            });
        }).catch((err) => {
            console.log(err);
        })

});


//Retrieve GET API
// router.get('/get/list', (req, res) => {

//     History.find();

// });
router.get('/get/detail', (req, res) => {

    let jsonObj = JSON.parse(JSON.stringify(req.body));

    console.log("exception req =>" + jsonObj);
    db.connectDB()
        .then(() => {
            Exception.findOne(jsonObj, (err, sentence) => {
                if (err) return res.status(500).send({
                    error: 'database failure'
                });
                res.json(sentence);
                console.log(sentence);
            });
        }).catch((err) => {
            console.log(err);
        })
});

//Update PUT API
// router.put('/update', (req, res) => {

//     History.update();

// });

//Delete DELETE API
// router.delete('/delete', (req, res) => {

//     History.remove();

// });

module.exports = router;
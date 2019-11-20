let express = require('express');
let router = express.Router();
let History = require('../models/history');
let db = require('../utils/db');

//history 도큐먼트 생성
router.post('/add', (req, res) => {
    let history = new History();

    history.user_id = req.body.user_id
    history.user_tag = req.body.user_tag
    history.input_text = req.body.input_text
    history.en_sentence = req.body.en_sentence
    history.ko_sentence = req.body.ko_sentence
    history.input_code = req.body.input_code
    history.bot_text = req.body.bot_text
    history.exception_text = req.body.exception_text
    db.connectDB()
        .then(() => {
            history.save((err) => {
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
// router.get('/get/detail', (req, res) => {

//     History.find();

// });

//Update PUT API
// router.put('/update', (req, res) => {

//     History.update();

// });

//Delete DELETE API
// router.delete('/delete', (req, res) => {

//     History.remove();

// });

module.exports = router;
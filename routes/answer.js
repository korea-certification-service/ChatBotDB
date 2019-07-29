let express = require('express');
let router = express.Router();
let Answer = require('../models/answer');

//Create POST API
router.post('/add', (req, res) => {
    let answer = new Answer();

    answer.input_code = req.body.input_code
    answer.answer_position = req.body.answer_position
    answer.answer_code = req.body.answer_code
    answer.answer_text_ko = req.body.answer_text_ko
    answer.answer_action = req.body.answer_action

    answer.save( (err) => {
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    });

});

//Retrieve GET API
// router.get('/get/list', (req, res) => {

//     Answer.find();

// });
router.get('/get/detail', (req, res) => {

    Answer.findOne({ "input_code": req.body.input_code },(err, answer) => {
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(answer);
        console.log(answer);
    });

});

//Update PUT API
// router.put('/update', (req, res) => {

//     Answer.update();

// });

//Delete DELETE API
// router.delete('/delete', (req, res) => {

//     Answer.remove();

// });

module.exports = router;
let express = require('express');
let router = express.Router();
let Answer = require('../models/answer');

//Create POST API
router.post('/add', (req, res) => {
    let answer = new Answer();

    answer.input_code = req.body.input_code
    answer.answer_position = null
    answer.answer_code = null
    answer.answer_text_ko = req.body.answer_text_ko
    answer.answer_action = null

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
router.get('/get/list', (req, res) => {

    let jsonObj = JSON.parse(JSON.stringify(req.body));

    console.log(req.body);

    Answer.find(jsonObj,(err, raw) => {
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(raw);
        //console.log(answer);
    });

});

//Update PUT API
router.put('/update', (req, res) => {
    console.log(req.body);
    Answer.findOneAndUpdate(
        {
            "input_code": req.body.input_code
        },
        {
            $set: { "answer_text_ko": req.body.answer_text_ko }
        },
        {
            upsert: false, 
            new: true
        },
        function(err, raw) {
            if (err) return res.status(500).send({error: 'update failure'});
            res.json(raw);
        })
});

//Delete DELETE API
// router.delete('/delete', (req, res) => {

//     Answer.remove();

// });

module.exports = router;
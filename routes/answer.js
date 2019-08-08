let express = require('express');
let router = express.Router();
let Answer = require('../models/answer');

//Create POST API
router.post('/add', (req, res) => {
    console.log(req.body);
    let answer = new Answer();

    answer.input_code = req.body.input_code
    answer.answer_position = null
    answer.answer_code = null
    answer.answer_text_en = req.body.answer_text_en
    answer.answer_text_ko = req.body.answer_text_ko
    answer.answer_action = null

    console.log(answer);
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
router.put('/update/answer_text_ko', (req, res) => {
    console.log(req.body);
    Answer.findOneAndUpdate(
        {
            "_id": req.body._id
        },
        {
            $set: { "answer_text_ko": req.body.answer_text_ko }
        },
        {
            upsert: false, 
            new: true
        },
        function(err, raw) {
            if (err) return res.status(500).send({error: 'update failure', err: err});
            res.json(raw);
        })
});

router.put('/update/answer_text_en', (req, res) => {
    console.log(req.body);
    Answer.findOneAndUpdate(
        {
            "_id": req.body._id
        },
        {
            $set: { "answer_text_en": req.body.answer_text_en }
        },
        {
            upsert: false, 
            new: true
        },
        function(err, raw) {
            if (err) return res.status(500).send({error: 'update failure',err: errr});
            res.json(raw);
        })
});

//Delete DELETE API
router.delete('/delete', (req, res) => {
    console.log(req.body);
    Answer.remove({ _id: req.body._id }, (err, raw) => {
        if(err) return res.status(500).json({ error: "delete failure" });
        res.status(204).send(raw);
    })
});

module.exports = router;
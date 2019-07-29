let express = require('express');
let router = express.Router();
let Sentence = require('../models/sentence');

//Create POST API
router.post('/add', (req, res) => {
    console.log(req.body);
    let sentence = new Sentence();

    sentence.input_text = req.body.input_text
    sentence.en_sentence = req.body.en_sentence
    sentence.ko_sentence = req.body.ko_sentence
    sentence.input_code = req.body.input_code
    sentence.keyword = req.body.keyword

    sentence.save( (err) => {
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

//     Sentence.find();

// });
router.get('/get/detail', (req, res) => {

    let jsonObj = JSON.parse(JSON.stringify(req.body));

    console.log(jsonObj);

    Sentence.findOne(jsonObj,(err, sentence) => {
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(sentence);
        console.log(sentence);
    });

});

//Update PUT API
// router.put('/update', (req, res) => {

//     Sentence.update();
    
// });

//Delete DELETE API
// router.delete('/delete', (req, res) => {

//     Sentence.remove();
    
// });

module.exports = router;
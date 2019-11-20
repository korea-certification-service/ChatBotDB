let express = require('express');
let router = express.Router();
let Sentence = require('../models/sentence');
let db = require('../utils/db');

//sentence 도큐먼트 생성
router.post('/add', (req, res) => {
    console.log(req.body);
    let sentence = new Sentence();

    sentence.input_text = req.body.input_text
    sentence.en_sentence = req.body.en_sentence
    sentence.ko_sentence = req.body.ko_sentence
    sentence.input_code = req.body.input_code
    sentence.keyword = req.body.keyword
    db.connectDB()
        .then(() => {
            sentence.save((err) => {
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

        });


});

//sentence 도큐먼트 목록 조회
router.get('/get/list', (req, res) => {

    let jsonObj = JSON.parse(JSON.stringify(req.body));

    console.log(jsonObj);
    db.connectDB()
        .then(() => {
            Sentence.find(jsonObj, (err, sentence) => {
                if (err) return res.status(500).send({
                    error: 'database failure'
                });
                res.json(sentence);
                console.log(sentence);
            });
        }).catch((err) => {

        });


});

//sentence 도큐먼트 상세 조회
router.get('/get/detail', (req, res) => {

    let jsonObj = JSON.parse(JSON.stringify(req.body));

    console.log(jsonObj);
    db.connectDB()
        .then(() => {
            Sentence.findOne(jsonObj, (err, sentence) => {
                if (err) return res.status(500).send({
                    error: 'database failure'
                });
                res.json(sentence);
                console.log(sentence);
            });
        }).catch((err) => {

        });


});

//sentence 도큐먼트 수정
router.put('/update', (req, res) => {

    console.log(req.body);
    db.connectDB()
        .then(() => {
            Sentence.findOneAndUpdate({
                    "_id": req.body._id
                }, {
                    $set: {
                        "input_code": req.body.input_code
                    }
                }, {
                    upsert: false,
                    new: true
                },
                (err, raw) => {
                    if (err) return res.status(500).send({
                        error: 'update failure'
                    });
                    res.json(raw);
                })
        }).catch((err) => {

        });


});

//sentence 도큐먼트 삭제
router.delete('/delete', (req, res) => {
    console.log(req.body);
    db.connectDB()
        .then(() => {
            Sentence.remove({
                _id: req.body._id
            }, (err, output) => {
                if (err) return res.status(500).json({
                    error: "delete failure"
                });
                res.status(204).send();
            })
        }).catch((err) => {

        });

});

module.exports = router;
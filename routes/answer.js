let express = require('express');
let router = express.Router();
let Answer = require('../models/answer');
let db = require('../utils/db');

//answer 도큐먼트 생성
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

    db.connectDB()
        .then(() => {
            answer.save((err) => {
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
            console.log(err)
        })

});

//answer 도큐먼트 목록 조회
router.get('/get/list', (req, res) => {

    let jsonObj = JSON.parse(JSON.stringify(req.body));

    console.log(req.body);
    db.connectDB()
        .then(() => {
            Answer.find(jsonObj, (err, raw) => {
                if (err) return res.status(500).send({
                    error: 'database failure'
                });
                res.json(raw);
            });
        }).catch((err) => {
            console.log(err);
        })
});

router.get('/get/:input_code', (req, res) => {

    console.log(req.params);

    db.connectDB()
        .then(() => {
            Answer.find({
                "input_code": req.params.input_code
            }, (err, raw) => {
                if (err) return res.status(500).send({
                    error: 'database failure'
                });
                res.json(raw);
                console.log(raw);
            });
        }).catch((err) => {

        })



});

//answer 한글버전 도큐먼트 수정
router.put('/update/answer_text_ko', (req, res) => {
    console.log(req.body);
    db.connectDB()
        .then(() => {
            Answer.findOneAndUpdate({
                    "_id": req.body._id
                }, {
                    $set: {
                        "answer_text_ko": req.body.answer_text_ko
                    }
                }, {
                    upsert: false,
                    new: true
                },
                function (err, raw) {
                    if (err) return res.status(500).send({
                        error: 'update failure',
                        err: err
                    });
                    res.json(raw);
                })
        }).catch((err) => {
            console.log(err);
        })

});

//answer 영어버전 도큐먼트 수정
router.put('/update/answer_text_en', (req, res) => {
    console.log(req.body);
    db.connectDB()
        .then(() => {
            Answer.findOneAndUpdate({
                    "_id": req.body._id
                }, {
                    $set: {
                        "answer_text_en": req.body.answer_text_en
                    }
                }, {
                    upsert: false,
                    new: true
                },
                function (err, raw) {
                    if (err) return res.status(500).send({
                        error: 'update failure',
                        err: errr
                    });
                    res.json(raw);
                })
        }).catch((err) => {
            console.log(err);
        })

});

//answer 도큐먼트 삭제
router.delete('/delete', (req, res) => {
    console.log(req.body);
    db.connectDB()
        .then(() => {
            Answer.remove({
                _id: req.body._id
            }, (err, raw) => {
                if (err) return res.status(500).json({
                    error: "delete failure"
                });
                res.status(204).send(raw);
            })
        }).catch((err) => {
            console.log(err);
        })
});

module.exports = router;
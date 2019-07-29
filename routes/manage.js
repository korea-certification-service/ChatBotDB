let express = require('express');
let router = express.Router();
let Manage = require('../models/manage');

//Create POST API
router.post('/add', (req, res) => {
    let manage = new Manage();

    manage.sentence_id = req.body.sentence_id
    manage.dialog_code = req.body.dialog_code
    manage.dialog_position = req.body.dialog_position
    manage.answer_id = req.body.answer_id
    manage.admin_id = req.body.admin_id
    manage.status = req.body.status

    manage.save( (err) => {
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

//     Manage.find();

// });
// router.get('/get/detail', (req, res) => {

//     Manage.find();

// });

//Update PUT API
// router.put('/update', (req, res) => {

//     Manage.update();
    
// });

//Delete DELETE API
// router.delete('/delete', (req, res) => {

//     Manage.remove();
    
// });

module.exports = router;
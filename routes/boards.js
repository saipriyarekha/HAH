var express = require('express');
var router = express.Router();

//board model
var Board = require('../models/boardm');
router.get('/board', (req, res) => {
    res.render('board');
});
router.post('/board', (req, res) => {
    var { sboard, sname, spercentage, syear, iboard, iname, ipercentage, iyear } = req.body;
    let errors = [];

    //check required fields
    if(!sboard || !sname || !spercentage || !syear || !iboard || !iname ||!ipercentage ||!iyear) {
        errors.push({ msg: 'Please fill all the fields' });
    }


    if(errors.length > 0) {
        res.render('board', {
            errors,
            sboard, 
            sname, 
            spercentage, 
            syear, 
            iboard, 
            iname, 
            ipercentage, 
            iyear
        });
    }else{
        const newBoard = new Board({
            sboard, 
            sname, 
            spercentage, 
            syear, 
            iboard, 
            iname, 
            ipercentage, 
            iyear
        });
           
        //save board
        newBoard.save()
        .then(Board => {
           req.flash('k');
            res.redirect('/contacts/contact');
           // res.send('hy');
        })
        .catch(err => console.log(err));
        //console.log("fail");
    }
});


module.exports = router;
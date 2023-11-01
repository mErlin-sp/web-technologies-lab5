var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Lab5. Oleksandr Popov. IT-z01. Variant 24 (4)'});
});

router.post('/login', function (req, res, next) {
    if (req.body['email'] === 'merlin.ua.1@gmail.com' && req.body['pass'] === 'qwertyuiop') {
        res.render('success', {name: 'Merlin', group: 'IT-z01', variant: '24(4)', tel: '+380982929375'})
    } else {
        res.render('error', {message: 'Invalid Credentials', error: new Error('Invalid Credentials')})
    }
});

module.exports = router;

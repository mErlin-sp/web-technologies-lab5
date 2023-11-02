const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydb.sqlite');

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS \'users\';')
    db.run(
        `
        CREATE TABLE 'users' (
            'ID' TINYINT NOT NULL,
            'NAME' VARCHAR(10) NOT NULL,
            'GROUP' VARCHAR(10) NOT NULL,
            'VARIANT' INT NOT NULL,
            'TEL' VARCHAR(10) NOT NULL,
            'EMAIL' VARCHAR(20) NOT NULL,
            'PASSWORD' VARCHAR(20) NOT NULL,
            'STATUS' VARCHAR DEFAULT 'NO STATUS',
            PRIMARY KEY ('ID')
        );
        `)
    db.run(`INSERT INTO users ('ID','NAME','GROUP','VARIANT','TEL','EMAIL','PASSWORD','STATUS') VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [1, 'Oleksandr', 'IT-z01', '24(4)', '+380982000000', 'merlin.ua.1@gmail.com', 'qwertyuiop', 'OK'], (err) => {
        if (err) {
            console.error(err.message);
        }
    });
});


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Lab5. Oleksandr Popov. IT-z01. Variant 24 (4)'});
});

router.post('/login', function (req, res, next) {

    const sql = 'SELECT * FROM users WHERE EMAIL = ? AND PASSWORD = ?';

    db.get(sql, [req.body.email, req.body.pass], (err, row) => {
        if (err) {
            console.log(err)
            res.status(500).send(err.message)
        } else {
            if (row) {
                console.log(row)
                res.render('success', row)
            } else {
                res.status(401).send('Access denied!');
            }
        }
    });
});

router.get('/admin', function (req, res) {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            console.log(err)
            res.render('error', err)
        } else {
            console.log(rows)
            res.render('admin', {'rows': rows})
        }
    });
});

router.post('/admin/add_user', function (req, res) {
    db.run(`INSERT INTO users ('ID','NAME','GROUP','VARIANT','TEL','EMAIL','PASSWORD','STATUS') VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [req.body.id, req.body.name, req.body.group, req.body.variant, req.body.tel, req.body.email, req.body.pass, req.body.status], (err) => {
        if (err) {
            console.log(err)
            res.status(500).send(err.message)
        } else {
            res.send(`User with ID ${req.body.id} has been added`);
        }
    });
});

router.get('/admin/delete_user/:id', function (req, res) {
    db.run(`DELETE FROM users WHERE ID = ?`, [req.params.id], (err) => {
        if (err) {
            console.log(err)
            res.status(500).send(err.message)
        } else {
            res.send(`User with ID ${req.params.id} has been deleted`);
        }
    });
});

module.exports = router;

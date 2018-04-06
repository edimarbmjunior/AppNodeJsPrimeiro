'use strict';

var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        title:"Node Store API",
        version: "1.0.0"
    });
});

module.exports = router;
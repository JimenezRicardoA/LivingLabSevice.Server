var express = require('express');
var router = express.Router();

const {
    signup,
    login,
    deletapplicant
} = require('../controllers/apservicio.controller');

const {
    createCv
} = require('../controllers/cv.controller');

router.post('/signup', signup);
router.post('/login', login);
router.post('/deleteapplicant', deletapplicant);

router.post('/cv', createCv);

module.exports = router;
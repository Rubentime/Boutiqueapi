const express = require('express');
const router = express.Router();
const authmid = require('../middleware/auth')

const authCtrl = require('../controller/auth');

router.post('/signup',  authCtrl.inscription);
router.post('/login',  authCtrl.connexion);

module.exports = router;

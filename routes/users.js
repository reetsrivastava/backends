const express = require('express');
const router = express.Router();

const { signup,login,signout,checkAuth,protected } = require('../controllers/users.js')

router.post('/signup',signup);
router.post('/login',login);
router.post('/signout',signout);
router.post('/protected',checkAuth,protected);

module.exports = router;
const express = require('express')
const { createUser, loginUser, logOut } = require('../controllers/userController');
const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logOut);



module.exports = router;
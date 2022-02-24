const express = require('express')
const { createUser, loginUser, logOut, forgetPassword, getUserDetails, updateProfile, getAllUsers, getSingleUser, updateRole, deleteUser } = require('../controllers/userController');
const { isAuthenticated,adminAccess } = require('../Middlewares/auth')
const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logOut);
router.route('/password/forget').post(forgetPassword);
router.route('/password/reset/:token').put(forgetPassword);
router.route('/me').get(isAuthenticated, getUserDetails);
router.route('/me/updateProfile').put(isAuthenticated, updateProfile);

router.route('/admin/user').get(isAuthenticated, adminAccess('admin'), getAllUsers);
router.route('/admin/user/:id')
.get(isAuthenticated, adminAccess('admin'), getSingleUser)
.put(isAuthenticated, adminAccess('admin'), updateRole)
.delete(isAuthenticated, adminAccess('admin'), deleteUser);









module.exports = router;
const express           = require('express');
const router            = express.Router();
const mainController    = require('./controllers/mainController');
const userController    = require('./controllers/userController');
const groupController   = require('./controllers/groupController');
const authController    = require('./controllers/authController');
const adminController   = require('./controllers/adminController');


router.get('/', mainController.home);

router.get('/signup', authController.signupPage);
router.get('/login', authController.loginPage);
router.get('/logout', authController.logout);

router.get('/admin', adminController.adminPage);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
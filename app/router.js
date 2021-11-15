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

/**
 * Administration
 */
router.get('/admin', adminController.adminPage);

/**
 * All User routes
*/
router.get('/users', userController.getAllUsers);
router.route('/users/:id(\\d+)')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

/**
 * All Group routes
*/
router.get('/groups', groupController.getAllGroups);
router.route('/groups/:id(\\d+)')
    .get(groupController.getGroup)
    .patch(groupController.updateGroup)
    .delete(groupController.deleteGroup);

/**
 * Inscription
 */
router.post('/signup', authController.signup);

/**
 * Connexion
 */
router.post('/login', authController.login);

module.exports = router;
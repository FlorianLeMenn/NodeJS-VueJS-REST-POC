const { GroupMembers, Group, User } = require('./models');

const express           = require('express');
const router            = express.Router();
const mainController    = require('./controllers/mainController');
const userController    = require('./controllers/userController');
const groupController   = require('./controllers/groupController');
const membersController = require('./controllers/groupMembersController');
const authController    = require('./controllers/authController');
const adminController   = require('./controllers/adminController');

router.get('/', mainController.home);
router.get('/signup', authController.signupPage);
router.get('/login', authController.loginPage);
router.get('/logout', authController.logout);
router.get('/admin', adminController.adminPage);

/**
 * Create user account
 * @route POST /signup
 * @group Inscription - 
 * @param {object} req.body (User fields)
 * @returns {object} 200 - success : true 
 * @returns {Error}  default - Unexpected error
 */
router.post('/signup', authController.signup);

 /**
  * Connexion with user informations
  * @route POST /login
  * @group Connexion - user connexion
  * @param {object} req.body (User fields: email & password)
  * @returns {object} 200 - success : true 
  * @returns {Error}  default - Unexpected error
  */
router.post('/login', authController.login);

/**
 * Return all Users
 * @route GET /users
 * @group user - Operations about user
 * @returns {object} 200 - An array of all users info
 * @returns {Error}  default - Unexpected error
 */
router.get('/users', userController.getAllUsers);

/**
 * Create new User
 * @route POST /user
 * @group user - Operations about user
 * @param {object} req.body.required (user fields)
 * @returns {User.model} 200 - An array of updated user
 * @returns {Error}  default - Unexpected error
 */
router.post('/user', userController.createUser);


router.route('/user/:id(\\d+)')
/**
 * Return User informations
 * @route GET /user/:id
 * @group user - Operations about user
 * @param {int} id.path.required (User id)
 * @returns {User.model} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
    .get(userController.getUser)
/**
 * Update existing User
 * @route PATCH /user/:id
 * @group user - Operations about user
 * @param {int} id.path.required (User id)
 * @param {object} req.body.required (User fields)
 * @returns {User.model} 200 - current updated user info 
 * @returns {Error}  default - Unexpected error
 */
    .patch(userController.updateUser)
/**
 * Delete existing User
 * @route DELETE /user/:id
 * @group user - Operations about user
 * @param {int} id.path.required (User id)
 * @returns {json} 200 - success : true
 * @returns {Error}  default - Unexpected error
 */
    .delete(userController.deleteUser);

/**
 * Return all groups
 * @route GET /groups
 * @group Group - Operations about group
 * @returns {object} 200 - An array of all groups info
 * @returns {Error}  default - Unexpected error
 */
router.get('/groups', groupController.getAllGroups);

/**
 * Create new group
 * @route POST /group
 * @group Group - Operations about group
 * @param {object} group.body.required (Group fields)
 * @returns {Group.model} 200 - An array of updated group
 * @returns {Error}  default - Unexpected error
 */
router.post('/group', groupController.createGroup);

/**
 * Get all group members
 * @route GET /group/:id/members
 * @group Group - Operations about group
 * @param {int} id.path.required (Group id)
 * @returns {object} 200 - An array of all members info from group 
 * @returns {Error}  default - Unexpected error
 */
router.get('/group/:id(\\d+)/members', membersController.getAllMembers);

/**
 * Add new member in group
 * @route POST /group/:id/members/add
 * @group Group - Operations about group
 * @param {int} id.path.required (Group id)
 * @param {object} req.body.required (User id)
 * @returns {GroupMembers.model} 200 - An array of all info about member added into the group 
 * @returns {Error}  default - Unexpected error
 */
router.post('/group/:id(\\d+)/members/add', membersController.addMember);

/**
 * Remove member from group
 * @route DELETE /group/:id/members
 * @group Group - Operations about group
 * @param {int} id.path.required (Group id)
 * @param {object} req.body.required (Users id)
 * @returns {json} 200 - success : true 
 * @returns {Error}  default - Unexpected error
 */
router.delete('/group/:id(\\d+)/members', membersController.removeMember);

/**
 * Get group informations
 * @route GET /group/:id
 * @group Group - Operations about group
 * @param {int} id.path.required (Group id)
 * @returns {Group.model} 200 - An array of all info from group 
 * @returns {Error}  default - Unexpected error
 */
router.route('/group/:id(\\d+)')
    .get(groupController.getGroup)

/**
 * Update group informations
 * @route PATCH /group/:id
 * @group Group - Operations about group
 * @param {int} id.path.required (Group id)
 * @param {object} group.body.required (Group fields)
 * @returns {Group.model} 200 - An array of all info from current updated group 
 * @returns {Error}  default - Unexpected error
 */
    .patch(groupController.updateGroup)

/**
 * Delete group
 * @route DELETE /group/:id
 * @group Group - Operations about group
 * @param {int} id.path.required (Group id)
 * @returns {json} 200 - success : true 
 * @returns {Error}  default - Unexpected error
 */
    .delete(groupController.deleteGroup);


module.exports = router;
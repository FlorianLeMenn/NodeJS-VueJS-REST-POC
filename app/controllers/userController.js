const { User } = require("../models");

const userController = {

    getAllUsers: async(req, res) => {
        const users = await User.findAll({});

        if(users){
            res.json(users);
        }
        else{
            res.status(400).json({});
        }
    },

    getUser: async(req, res) => {
        const userId = +req.params.id;
    
        const user = await User.findByPk(userId, {
            include: ["groups_owner"]
        });

        if(user){
            res.json(user);
        }
        else{
            res.status(400).json({});
        }
    },

    createUser: async(req, res) => {
        const post = req.body;

        if(post.password !== post.passwordConfirm)
            res.json('error');

        const newUser = await User.create(post);

        if(newUser){
            res.json(newUser);
        }
        else{
            res.status(400).json({});
        }
    },

    updateUser: async(req, res) => {
        const post = req.body;
    
        const updatedUser = await User.update(post);

        if(updatedUser){
            res.json(newUser);
        }
        else{
            res.status(400).json({});
        }
    },

    deleteUser: async(req, res) => {
        const userId = +req.params.id;
    
        const deletedUser = await User.update(userId);

        if(deletedUser){
            res.json(newUser);
        }
        else{
            res.status(400).json({});
        }
    },

}

module.exports = userController;
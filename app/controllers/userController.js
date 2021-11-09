const { User } = require("../models");

const userController = {

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

    readUser: async(req, res) => {
        const userId = +req.body.id;
    
        const user = await User.read(userId);

        if(user){
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
        const userId = +req.body.id;
    
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
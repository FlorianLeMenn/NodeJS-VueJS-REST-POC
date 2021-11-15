const { User } = require("../models");

const userController = {

    getAllUsers: async(req, res) => {
        try {
            const users = await User.findAll({});

            if(!users)
                return res.status(404).json({});

            res.json(users);
        } catch (err) {
            res.status(500).json({err});
        }
    },

    getUser: async(req, res) => {
        try {
            const userId    = +req.params.id;
            const user      = await User.findByPk(userId, {
                include: ["groups_owner"]
            });
    
            if(!user)
                return res.status(404).json({});

            res.json(user);
        } catch (err) {
            res.status(500).json({err});
        }
    },

    createUser: async(req, res) => {
        try {
            const post = req.body;

            if(post.password !== post.passwordConfirm)
                res.json('error');
    
            const newUser = await User.create(post);
    
            if(!newUser)
                return res.status(404).json({});
    
            res.json(newUser);
        } catch (err) {
            res.status(500).json({err});
        }
    },

    updateUser: async(req, res) => {
        try {
            const post          = req.body;
            const updatedUser   = await User.update(post, {
                where: {id: +req.params.id},
                returning: true
            });
    
            if(!updatedUser)
                return res.status(404).json({});
    
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json({err});
        }
    },

    deleteUser: async(req, res) => {
        try {
            const userId        = +req.params.id;
            const deletedUser   = await User.delete(userId, {
                where: {id: +req.params.id},
                returning: true
            });
    
            if(!deletedUser)
                return res.status(404).json({});
    
            res.json(deletedUser);
        } catch (err) {
            res.status(500).json({err});
        }
    },

}

module.exports = userController;
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
                include: ["groups_owner", "my_groups"]
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
            if(!post.username) return res.status(400).send({'name': 'username', 'message':'Le champs nom d\'utilisateur n\'est pas renseigné.'}); 
            if(!post.email) return res.status(400).send({'name': 'email', 'message':'Le champs e-mail n\'est pas renseigné.'}); 
            if(!post.birthdate) return res.status(400).send({'name': 'birthday', 'message':'Le champs date de naissance n\'est pas renseigné.'}); 
            if(post.password !== post.passwordConfirm)
                return res.status(400).send({'name': 'passwordConfirm', 'message':'Les mots de passe ne sont pas identiques.'}); 
            //check email is correct format
            //check if user mail is not present
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
            const post = req.body;
            //destructuration de tableau: [users] => recup le 1er element
            const [nbUserUpdated, [users]]   = await User.update(post, {
                where: {id: +req.params.id},
                returning: true
            });
    
            if(!nbUserUpdated)
                return res.status(404).json({});
    
            res.json(users);
        } catch (err) {
            res.status(500).json({err});
        }
    },

    deleteUser: async(req, res) => {
        try {
            const userId    = +req.params.id;
            const nbRemoved = await User.destroy({
                where: {id: userId}
            });
    
            if(!nbRemoved)
                return res.status(404).json({});
    
            res.json({succes:true});
        } catch (err) {
            res.status(500).json({err});
        }
    },

}

module.exports = userController;
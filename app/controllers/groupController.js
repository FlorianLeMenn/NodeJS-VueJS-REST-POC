const { Group } = require("../models");

const groupController = {

    getAllGroups: async(req, res) => {
        try {
            const groups = await Group.findAll({
                include: [{
                    association: "group_members",
                    attributes: ["username_alias","user_id"]
                },
                {
                    association: "admin",
                    attributes: ["username", "id"]
                } 
                ],
            });

            if(!groups)
                return res.status(404).json({});

            res.json(groups);
                
        } catch (err) {
            res.status(500).json({err});
        }
    },

    getGroup: async(req, res) => {
        try {
            const groupId   = +req.params.id;
            const group     = await Group.findByPk(groupId, {
                include: [
                    {
                        association: "group_members",
                        attributes: ["username_alias","user_id"]
                    },
                    {
                        association: 'admin',
                        attributes: ["id"]
                    },
                ]
            });

            if(!group)
                return res.status(404).json({});

            res.json(group);
        } catch (err) {
            res.status(500).json({err});
        }
    },

    createGroup: async(req, res) => {
        try {
            const post      = req.body;
            const newGroup  = await Group.create(post);

            if(!newGroup)
                return res.status(404).json({});

            res.json(newGroup);
        } catch (err) {
            res.status(500).json({err});
        }
    },

    updateGroup: async(req, res) => {
        try {
            const post = req.body;
            //destructuration de tableau: [groups] => recup le 1er element
            const [nbGroupUpdated, [groups]]  = await Group.update(post,{
                where: {id: +req.params.id},
                returning: true //retourne les données MAJ, en 2eme position du tableau
            });

            if(!nbGroupUpdated)
                return res.status(404).json({});
            //on retroune le premier élément modifié
            res.json(groups); 
        } catch (err) {
            res.status(500).json({err});
        }
    },

    deleteGroup: async(req, res) => {
        try {
            const groupId    = +req.params.id;
            const nbRemoved  = await Group.destroy({
                where: {id: groupId}
            });
    
            if(!nbRemoved)
                return res.status(404).json({});
                
            res.json({succes:true});
        } catch (err) {
            res.status(500).json({err});
        }
    },

}

module.exports = groupController;
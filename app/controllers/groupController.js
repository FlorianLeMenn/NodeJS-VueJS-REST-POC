const { Group } = require("../models");

const groupController = {

    getAllGroups: async(req, res) => {
        try {
            const groups = await Group.findAll({
                include: ["group_members", "admin"],
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
                include: ["admin"],
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
        } catch (error) {
            res.status(500).json({err});
        }
    },

    updateGroup: async(req, res) => {
        try {
            const post          = req.body;
            const updatedGroup  = await Group.update(post,{
                where: {id: +req.params.id},
                returning: true
            });
    
            if(!updatedGroup)
                return res.status(404).json({});

            res.json(updatedGroup); 
        } catch (error) {
            res.status(500).json({err});
        }
    },

    deleteGroup: async(req, res) => {
        try {
            const groupId       = +req.params.id;
            const deletedGroup  = await Group.delete(groupId,{
                where: {id: +req.params.id},
                returning: true
            });
    
            if(!deletedGroup)
                return res.status(404).json({});
                
            res.json(group);
        } catch (error) {
            res.status(500).json({err});
        }
    },

}

module.exports = groupController;
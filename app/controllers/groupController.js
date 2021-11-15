const { Group } = require("../models");

const groupController = {

    getAllGroups: async(req, res) => {
        const groups = await Group.findAll({});

        if(groups){
            res.json(groups);
        }
        else{
            res.status(400).json({});
        }
    },

    getGroup: async(req, res) => {
        const groupId = +req.params.id;
    
        const group = await Group.findByPk(groupId, {
            include: ["admin"],
        });

        if(group){
            res.json(group);
        }
        else{
            res.status(400).json({});
        }
    },

    createGroup: async(req, res) => {
        const post = req.body;

        if(post.password !== post.passwordConfirm)
            res.json('error');

        const newGroup = await Group.create(post);

        if(newGroup){
            res.json(newGroup);
        }
        else{
            res.status(400).json({});
        }
    },

    updateGroup: async(req, res) => {
        const post = req.body;

        const updatedGroup = await Group.update(post);

        if(updatedGroup){
            res.json(updatedGroup);
        }
        else{
            res.status(400).json({});
        }
    },

    deleteGroup: async(req, res) => {
        const groupId = +req.params.id;

        const deletedGroup = await Group.delete(groupId);

        if(deletedGroup){
            res.json(group);
        }
        else{
            res.status(400).json({});
        }
    },

}

module.exports = groupController;
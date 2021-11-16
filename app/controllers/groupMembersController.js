const { GroupMembers, User } = require("../models");
const { Op } = require("sequelize");

const groupMembersController = {

    getAllMembers: async(req, res) => {
        try {
            const groupId = +req.params.id;
            const members = await GroupMembers.findAll({
                include: [{
                    where: {id: groupId},
                    association: "group",
                },]
            });

            if(!members)
                return res.status(404).json({});

            res.json(members);
                
        } catch (err) {
            res.status(500).json({err});
        }
    },

    addMember: async(req, res) => {
        try {
            const post    = req.body;
            const groupId = +req.params.id;
            const user    = await User.findByPk(+post.user_id);

            if(!user)
                return res.status(404).json({});

            //On set par default le pseudo
            if(!post.username_alias)
                post.username_alias = user.username;

            const data  = {
                'username_alias' : user.username,
                'user_id' : user.id,
                'group_id' : groupId,
                'roles' :  {roles:["ROLE_GROUP_MEMBER"]}
            };

            const member = await GroupMembers.create(data);

            res.json(member); 
        } catch (err) {
            res.status(500).json({err});
        }
    },

    removeMember: async(req, res) => {
        try {
            const groupId = +req.params.id;
            const post    = req.body;
            const user    = await User.findByPk(+post.user_id);

            if(!user)
                return res.status(404).json({});

            console.log(user.id, groupId);
            const nbRemoved = await GroupMembers.destroy({
                where: {
                    [Op.and]: [                    
                        {group_id: groupId},
                        {user_id: user.id}
                    ]
                }
            });
    
            if(!nbRemoved)
                return res.status(404).json({});
                
            res.json({succes:true});
        } catch (err) {
            res.status(500).json({err});
        }
    },

}

module.exports = groupMembersController;
const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = require('../database');

class GroupMembers extends Model {}

GroupMembers.init({    
        username_alias: {
            type: Sequelize.STRING,
            allowNull: true
        },
        roles: {
            type: Sequelize.JSON,
            allowNull: false,
            defaultValue: {roles:["ROLE_GROUP_MEMBER"]}
        },
        access: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }, 
    },
    {
        underscored: true,
        sequelize, //connexion a l'intance
        timestamps: true,
        tableName: 'group_members',
    },
);

module.exports = GroupMembers;
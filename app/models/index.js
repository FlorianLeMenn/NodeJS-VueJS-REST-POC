const sequelize                 = require("../database");
const {Sequelize, DataTypes}    = require('sequelize');

const User          = require('./user');
const Group         = require('./group');
const GroupMembers  = require('./group_members');

//Un group peut avoit 0 ou N utilisateur
Group.belongsToMany(User,{ 
    as: 'members',
    through: GroupMembers,
    foreignKey: 'group_id',
    otherKey: 'user_id' 
});

// Un utilisateur peut etre associé a 0 ou N groupe
User.belongsToMany(Group,{ 
    as: 'my_groups',
    through: GroupMembers,
    foreignKey: 'user_id',
    otherKey: 'group_id'
});

GroupMembers.belongsTo(Group,{
    foreignKey: 'group_id', // nom du champs de la clef etrangère
    as: 'group' // nom de la relation / alias
});

GroupMembers.belongsTo(User,{
    foreignKey: 'user_id', // nom du champs de la clef etrangère
    as: 'member' // nom de la relation / alias
});

Group.hasMany(GroupMembers,{
    foreignKey: 'group_id',
    as: 'group_members'
});
User.hasMany(GroupMembers,{
    foreignKey: 'user_id',
    as: 'group_members'
});

// 0:N -- Un utilisateur peut créer 0 ou N group
// Un groupe a un admin (user)
Group.belongsTo(User, {
    foreignKey: 'user_id', // nom du champs de la clef etrangère
    as: 'admin' // nom de la relation / alias
});

// Un utilisateur a créé 0 ou N groupe
User.hasMany(Group, {
    foreignKey: 'user_id',
    as: 'groups_owner'
})


// Creer les tables si elle n'existe pas: option force
sequelize.sync({
    force: true,
});

module.exports = {User, Group};
const sequelize                 = require("../database");
const {Sequelize, DataTypes}    = require('sequelize');

const User          = require('./user');
const Group         = require('./group');
const GroupMembers  = require('./group_members');

//Un group peut avoit 0 ou N utilisateurs
Group.belongsToMany(User,{ 
    as: 'members',
    through: GroupMembers,
    foreignKey: {
        name: 'group_id', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    otherKey: 'user_id',
    onDelete: 'cascade' //quand je supprime le groupe, je supprime la relation avec tous les users reliés
});

// Un utilisateur peut etre associé a 0 ou N groupe
User.belongsToMany(Group,{ 
    as: 'my_groups',
    through: GroupMembers,
    foreignKey: {
        name: 'user_id', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    otherKey: 'group_id',
    onDelete: 'cascade' //quand je supprime le user, je supprime la relation avec tous les groups reliés
});

//Les membres dépendent d'un groupe
GroupMembers.belongsTo(Group,{
    as: 'group', // nom de la relation / alias
    foreignKey: 'group_id', // nom du champs de la clef etrangère
});

//Un membre est associé à un utilisateur
GroupMembers.belongsTo(User,{
    as: 'member', // nom de la relation / alias
    foreignKey: 'user_id', // nom du champs de la clef etrangère
});

//Mon groupe à plusieurs membres
Group.hasMany(GroupMembers,{
    as: 'group_members',
    foreignKey: 'group_id',
});

//Mon utilisateur est associé à plusieurs groupes
User.hasMany(GroupMembers,{
    as: 'group_members',
    foreignKey: 'user_id',
});

// 0:N -- Un utilisateur peut créer 0 ou N group
// Un groupe a un admin (user)
Group.belongsTo(User, {
    as: 'admin', // nom de la relation / alias
    foreignKey: {
        name: 'user_id', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    onDelete: 'cascade'
});

// Un utilisateur a créé 0 ou N groupe
User.hasMany(Group, {
    foreignKey: 'user_id',
    as: 'groups_owner'
})

module.exports = {User, Group};
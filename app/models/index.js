const sequelize = require("../database");

const User  = require('./user');
const Group = require('./group');

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

//N:N un group peut avoit 0 ou N utilisateur | un utilisateur peut être associé à 0 ou N group
Group.belongsToMany(User, {
    as: 'users',
    through: 'group_has_user',
    foreignKey: 'group_id',
    otherKey: 'user_id'
});

// Un utilisateur peut etre associé a 0 ou N groupe
User.belongsToMany(Group, {
    as: 'groups',
    through: 'group_has_user',
    foreignKey: 'user_id',
    otherKey: 'group_id'
});

// Creer les tables si elle n'existe pas option fore
sequelize.sync({
    force: true,
});

module.exports = {User, Group};
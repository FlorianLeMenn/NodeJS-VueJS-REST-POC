const {Sequelize, DataTypes, Model} = require('sequelize');

// on importe la connexion
const sequelize = require('../database');

class User extends Model {}

User.init({
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mail: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        roles: Sequelize.STRING,
        status: {
            type: Sequelize.BOOLEAN,
            default: false
        },
        birthday: {
            type: Sequelize.DATE,
            allowNull: false
        },
        filename: Sequelize.STRING,
        activation_token: Sequelize.STRING,

    },
    {
        sequelize, //connexion a l'instance
        timestamps: true,
        modelName: 'User'
    }
);


module.exports = User;
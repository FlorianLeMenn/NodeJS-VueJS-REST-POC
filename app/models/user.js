const {Sequelize, DataTypes, Model} = require('sequelize');

// on importe la connexion
const sequelize = require('../database');

class User extends Model {
    //getFullName = get fullname(), avec cette syntaxe l'appel est utilisé comme une propriété
    get fullname() {
        return `${this.username} Test`;
    }
}

User.init({
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        roles: {
            type: Sequelize.STRING,
            allowNull: false,
            default: ["ROLE_USER"]
        },
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
        underscored: true,
        sequelize, //connexion a l'instance
        timestamps: true,
        tableName: 'user'
    }
);

module.exports = User;
const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = require('../database');

class Group extends Model {}

Group.init({    
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description:Sequelize.TEXT, //je ne precise que le type car par default il peut etre null
    private: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }, 
    },
    {
        underscored: true,
        sequelize, //connexion a l'intance
        timestamps: true,
        tableName: 'group',
    },
);

module.exports = Group;
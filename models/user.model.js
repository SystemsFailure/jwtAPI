const { Sequelize, DataTypes, Model } = require('sequelize');
const sequalizeService = require('../services/db.service');

const sequelize = new sequalizeService().init();

class User extends Model {};

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User'
})

module.exports = User;

const { DataTypes, Model } = require('sequelize');
const sequalizeService = require('../services/db.service');

const sequelize = new sequalizeService().init();

class Token extends Model {};

Token.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
    },
    AccessToken: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    RefreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    modelName: 'Token'
})

module.exports = Token;

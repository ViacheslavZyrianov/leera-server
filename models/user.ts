const { DataTypes } = require('sequelize')

const sequelize = require('../utils/database')

module.exports = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_premium: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_email_approved: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: false
})

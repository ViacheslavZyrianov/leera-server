const { DataTypes } = require('sequelize')

const sequelize = require('../utils/database')

module.exports = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
    },
    uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
})

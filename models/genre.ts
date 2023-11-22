const { DataTypes } = require('sequelize')

const sequelize = require('../utils/database')

module.exports = sequelize.define('genre', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    isEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: false
})

const { DataTypes } = require('sequelize')

const sequelize = require('../utils/database')

module.exports = sequelize.define('story', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: DataTypes.STRING,
    tags: DataTypes.STRING,
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
})

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
    image_url: DataTypes.STRING,
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tags: DataTypes.STRING,
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    timestamps: false
})

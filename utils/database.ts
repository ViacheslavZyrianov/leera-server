const { Sequelize } = require('sequelize')

module.exports = new Sequelize('leera_db', 'root', 'rootroot', {
    host: '127.0.0.1',
    dialect: 'mysql'
})

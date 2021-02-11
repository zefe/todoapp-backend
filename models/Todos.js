const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const Todos = db.define('todos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
      },
    description: {
        type: DataTypes.TEXT
    },
    completed: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
    }
},
{
    timestamps: true,

});

module.exports = Todos;
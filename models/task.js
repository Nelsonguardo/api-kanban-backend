const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Taks = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    column_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Columns',
            key: 'id'
        }
    },
    assignee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: false,
        defaultValue: 'medium'
    },
}, {
    timestamps: false
});

module.exports = Taks;
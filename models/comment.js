const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definition of the Comment model
// This model represents comments made on tasks in the Kanban board system
const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    task_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false, // Disable automatic timestamps
});

module.exports = Comment;
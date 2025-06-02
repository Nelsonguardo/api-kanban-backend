const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const BoardUser = sequelize.define('BoardUser', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    board_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
}, {
    timestamps: false, // o true si deseas campos created_at, updated_at
});

module.exports = BoardUser;
const User = require('./user');
const Board = require('./board');
const BoardUser = require('./boardUser');
const Column = require('./column');

// Asociación: Un board pertenece a un usuario (owner)
Board.belongsTo(User, {
    foreignKey: 'owner_id',
    as: 'owner'
});

// Asociación: Un usuario tiene muchos boards creados (owner)
User.hasMany(Board, {
    foreignKey: 'owner_id',
    as: 'boards'
});

// Asociación Many-to-Many: Un usuario puede pertenecer a muchos boards y un board puede tener muchos usuarios
User.belongsToMany(Board, {
    through: BoardUser,
    foreignKey: 'user_id',
    otherKey: 'board_id',
    as: 'sharedBoards'
});

Board.belongsToMany(User, {
    through: BoardUser,
    foreignKey: 'board_id',
    otherKey: 'user_id',
    as: 'collaborators'
});

// Asociación: Un board tiene muchas columnas
Board.hasMany(Column, {
    foreignKey: 'board_id',
    as: 'columns'
});

// Asociación: Una columna pertenece a un board
Column.belongsTo(Board, {
    foreignKey: 'board_id',
    as: 'board'
});

module.exports = {
    User,
    Board,
    BoardUser,
    Column
};
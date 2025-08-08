const User = require('./user');
const Board = require('./board');
const BoardUser = require('./boardUser');
const Column = require('./column');
const Task = require('./task');
const Comment = require('./comment');

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

// Asociación Many-to-Many: Un board puede tener muchos colaboradores (usuarios) y un usuario puede colaborar en muchos boards
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

// Asociación: Una columna tiene muchas tareas
Column.hasMany(Task, {
    foreignKey: 'column_id',
    as: 'tasks'
});

// Asociación: Una tarea pertenece a una columna
Task.belongsTo(Column, {
    foreignKey: 'column_id',
    as: 'column'
});

// Asociación: Una tarea puede ser asignada a un usuario
Task.belongsTo(User, {
    foreignKey: 'assignee_id',
    as: 'assignee'
});

// Asociación: Un usuario puede tener muchas tareas asignadas
User.hasMany(Task, {
    foreignKey: 'assignee_id',
    as: 'assignedTasks'
});

// Asociación: Una tarea puede tener muchos comentarios
Task.hasMany(Comment, {
    foreignKey: 'task_id',
    as: 'comments'
});
// Asociación: Un comentario pertenece a una tarea
Comment.belongsTo(Task, {
    foreignKey: 'task_id',
    as: 'task'
});

// Asociación: Un comentario pertenece a un usuario
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

// Asociación: Un usuario puede hacer muchos comentarios
User.hasMany(Comment, {
    foreignKey: 'user_id',
    as: 'comments'
});

// Exportar modelos

module.exports = {
    User,
    Board,
    BoardUser,
    Column,
    Task, 
    Comment
};
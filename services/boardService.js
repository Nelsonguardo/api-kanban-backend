const { User, Board, BoardUser, Column, Task } = require('../models');

class BoardService {

    async getAllBoards() {
        try {
            const boards = await Board.findAll({
                include: [
                    {
                        model: User,
                        as: 'owner',
                        attributes: ['id', 'name', 'email']
                    },
                    {
                        model: User,
                        as: 'collaborators',
                        attributes: ['id', 'name', 'email'],
                        through: { attributes: [] } // Oculta los atributos de la tabla intermedia
                    }
                ]
            });
            return boards;
        } catch (error) {
            throw new Error('Error al obtener los tableros');
        }
    }

    async getOneBoard(id) {
        try {
            const board = await Board.findByPk(id, {
                include: [
                    {
                        model: User,
                        as: 'owner',
                        attributes: ['id', 'name', 'email']
                    },
                    {
                        model: User,
                        as: 'collaborators',
                        attributes: ['id', 'name', 'email'],
                        through: { attributes: [] }
                    },
                    {
                        model: Column,
                        as: 'columns',
                        attributes: ['id', 'name'],
                        include: [
                            {
                                model: Task,
                                as: 'tasks',
                                attributes: ['id', 'title', 'description', 'priority'],
                                include: [
                                    {
                                        model: User,
                                        as: 'assignee',
                                        attributes: ['id', 'name', 'email']
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
            return board;
        } catch (error) {
            throw new Error('Error al obtener el tablero');
        }
    }
    async createBoard(data) {
        try {
            const board = Board.create(data);
            return board;
        } catch (error) {
            throw new Error('Error al crear el tablero');
        }
    }

    async updateBoard(id, title) {
        try {
            const board = await Board.update(title, {
                where: { id }
            });
            return board;
        } catch (error) {
            throw new Error('Error al crear el tablero');
        }
    }
    async deleteBoard(id) {
        try {
            const board = await Board.destroy({
                where: { id }
            });
            return board;
        } catch (error) {
            throw new Error('Error al eliminar el usuario');
        }
    }

    async createBoardUser(boardId, userId) {
        try {
            const boardUser = await BoardUser.create({
                board_id: boardId,
                user_id: userId
            });
            return boardUser;

        } catch (error) {
            throw new Error('Error al crear la relación entre el tablero y el usuario');

        }
    }
    async deleteBoardUser(boardId, userId) {
        try {
            const boardUser = await BoardUser.destroy({
                where: {
                    board_id: boardId,
                    user_id: userId
                }
            });
            return boardUser;
        } catch (error) {
            throw new Error('Error al eliminar la relación entre el tablero y el usuario');
        }
    }

    async getBoardUsers(boardId, userId) {
        try {
            const boardUsers = await BoardUser.findAll({
                where: {
                    board_id: boardId,
                    user_id: userId
                }
            });
            return boardUsers;
        } catch (error) {
            throw new Error('Error al obtener los usuarios del tablero');
        }
    }
}

module.exports = new BoardService();
const boardService = require('../services/boardService');
const userService = require('../services/userService');
class BoardController {

    async getAllBoards(req, res) {
        try {
            const boards = await boardService.getAllBoards();
            if (!boards || boards.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se encontraron tableros'
                });
            }
            return res.status(200).json({
                status: 'success',
                boards
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async getOneBoard(req, res) {
        let { id } = req.params;
        try {
            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de tablero no proporcionado'
                });
            }
            const board = await boardService.getOneBoard(id);
            if (!board) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Tablero no encontrado'
                });
            }
            return res.status(200).json({
                status: 'success',
                board

            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async createBoard(req, res) {
        let { title } = req.body;
        if (!title) {
            return res.status(400).json({
                status: 'error',
                message: 'El nombre del tablero es obligatorio'
            });
        }
        let owner_id = req.user.id; // Asumiendo que el ID del usuario está en req.user
        let boardData = {
            title,
            owner_id
        };
        if (!owner_id) {
            return res.status(400).json({
                status: 'error',
                message: 'ID de propietario no proporcionado'
            });
        }
        try {
            const newBoard = await boardService.createBoard(boardData);
            return res.status(201).json({
                status: 'success',
                board: newBoard
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async updateBoard(req, res) {
        try {
            let { id } = req.params;
            let { title } = req.body;
            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de tablero no proporcionado'
                });
            }
            if (!title) {
                return res.status(400).json({
                    status: 'error',
                    message: 'El título del tablero es obligatorio'
                });
            }
            const getBoard = await boardService.getOneBoard(id);
            if (!getBoard) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Tablero no encontrado'
                });
            }
            const updateBoard = await boardService.updateBoard(id, title);
            if (!updateBoard) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al actualizar el tablero'
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'Tablero actualizado correctamente',
                board: updateBoard
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });

        }
    }
    async deleteBoard(req, res) {
        try {
            const { id } = req.params;

            // Validar que existe el ID
            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de usuario no proporcionado'
                });
            }

            // Verificar que el tablero a eliminar existe
            const board = await boardService.getOneBoard(id);
            if (!board) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Tablero no encontrado'
                });
            }

            await boardService.deleteBoard(id);
            if (!board) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se pudo eliminar el tablero'
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Tablero eliminado correctamente'
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
    async createBoardUser(req, res) {
        try {
            const { boardId, userId } = req.body;

            // Validar que existen los IDs
            if (!boardId || !userId) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de tablero o usuario no proporcionado'
                });
            }

            // Verificar que el tablero existe
            const board = await boardService.getOneBoard(boardId);
            if (!board) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Tablero no encontrado'
                });
            }

            // Verificar que el usuario existe
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Usuario no encontrado'
                });
            }

            // Verificar si el usuario ya está asignado al tablero
            const existingBoardUser = await boardService.getBoardUsers(boardId, userId);
            if (existingBoardUser && existingBoardUser.length > 0) {
                return res.status(409).json({
                    status: 'error',
                    message: 'El usuario ya está asignado a este tablero'
                });
            }

            // Crear la relación entre el tablero y el usuario
            const newBoardUser = await boardService.createBoardUser(boardId, userId);
            return res.status(201).json({
                status: 'success',
                boardUser: newBoardUser
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
    async deleteBoardUser(req, res) {
        try {
            const { boardId, userId } = req.params;

            // Validar que existen los IDs
            if (!boardId || !userId) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de tablero o usuario no proporcionado'
                });
            }

            // Verificar que el tablero existe
            const board = await boardService.getOneBoard(boardId);
            if (!board) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Tablero no encontrado'
                });
            }

            // Verificar que el usuario existe
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Usuario no encontrado'
                });
            }

            // Verificar si el usuario está asignado al tablero
            const existingBoardUser = await boardService.getBoardUsers(boardId, userId);
            if (!existingBoardUser || existingBoardUser.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'El usuario no está asignado a este tablero'
                });
            }

            const deletedBoardUser = await boardService.deleteBoardUser(boardId, userId);
            return res.status(200).json({
                status: 'success',
                message: 'Usuario eliminado del tablero correctamente',
                boardUser: deletedBoardUser
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

module.exports = new BoardController();
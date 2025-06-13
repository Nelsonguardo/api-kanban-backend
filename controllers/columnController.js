const columnService = require('../services/columnService');

class ColumnController {
    async getAllColumns(req, res) {
        try {
            const columns = await columnService.getAllColumns();
            if (!columns || columns.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se encontraron columnas'
                });
            }
            return res.status(200).json({
                status: 'success',
                columns
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async getOneColumn(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de columna no proporcionado'
                });
            }
            const column = await columnService.getColumnById(id);
            if (!column) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Columna no encontrada'
                });
            }
            return res.status(200).json({
                status: 'success',
                column
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async createColumn(req, res) {
        try {
            const { name, board_id } = req.body;
            if (!name || !board_id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'El nombre de la columna y board_id son obligatorios'
                });
            }
            const newColumn = await columnService.createColumn(req.body);
            return res.status(201).json({
                status: 'success',
                column: newColumn
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async updateColumn(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de columna no proporcionado'
                });
            }
            if (!name) {
                return res.status(400).json({
                    status: 'error',
                    message: 'El nombre de la columna es obligatorio'
                });
            }
            const existingColumn = await columnService.getColumnById(id);
            if (!existingColumn) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Columna no encontrada'
                });
            }
            const updatedColumn = await columnService.updateColumn(id, req.body);
            return res.status(200).json({
                status: 'success',
                message: 'Columna actualizada correctamente',
                column: updatedColumn
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async deleteColumn(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de columna no proporcionado'
                });
            }
            const existingColumn = await columnService.getColumnById(id);
            if (!existingColumn) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Columna no encontrada'
                });
            }
            await columnService.deleteColumn(id);
            return res.status(200).json({
                status: 'success',
                message: 'Columna eliminada correctamente'
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

module.exports = new ColumnController();
const taskService = require('../services/taskService');


class TaskController {
    async getTaskById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de tarea no proporcionado'
                });
            }
            const task = await taskService.getTaskById(id);

            if (!task) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Tarea no encontrada'
                });
            }

            return res.status(200).json({
                status: 'success',
                task
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
    
    async getTasksByColumn(req, res) {
        try {
            const { columnId } = req.params;
            if (!columnId) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de columna no proporcionado'
                });
            }
            const tasks = await taskService.getTaskByColumn(columnId);

            if (!tasks || tasks.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se encontraron tareas para esta columna'
                });
            }

            return res.status(200).json({
                status: 'success',
                tasks
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
    async getTasksByBoard(req, res) {
        try {
            const { boardId } = req.params;
            if (!boardId) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de tablero no proporcionado'
                });
            }
            const tasks = await taskService.getTaskByBoard(boardId);

            if (!tasks || tasks.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se encontraron tareas para este tablero'
                });
            }

            return res.status(200).json({
                status: 'success',
                tasks
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
    async createTask(req, res) {
        try {
            const { title, description, column_id, assignee_id, priority } = req.body;
            if (!title || !description || !column_id || !priority) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Faltan datos requeridos'
                });
            }
            const newTask = await taskService.createTask({ title, description, column_id, assignee_id, priority });

            return res.status(201).json({
                status: 'success',
                task: newTask
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async getAllTasks(req, res) {
        try {
            const tasks = await taskService.getAllTasks();

            if (!tasks || tasks.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se encontraron tareas'
                });
            }

            return res.status(200).json({
                status: 'success',
                tasks
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
    async updateTask(req, res) {
        try {
            const { id } = req.params;
            const { title, description, column_id, assignee_id, priority } = req.body;

            if (!id || !title || !description || !column_id || !priority) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Faltan datos requeridos'
                });
            }

            const updatedTask = await taskService.updateTask(id, { title, description, column_id, assignee_id, priority });

            if (!updatedTask) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Tarea no encontrada'
                });
            }

            return res.status(200).json({
                status: 'success',
                task: updatedTask
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
    async deleteTask(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de tarea no proporcionado'
                });
            }
            const deletedTask = await taskService.deleteTask(id);

            if (!deletedTask) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Tarea no encontrada'
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Tarea eliminada exitosamente'
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

module.exports = new TaskController();
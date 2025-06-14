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
}

module.exports = new TaskController();
// filepath: d:\Programacion\APIs\api-kanban-backend\controllers\taskTimeLogController.js
const taskTimeLogService = require('../services/taskTimeLogService');

class TaskTimeLogController {
    async toggleTimer(req, res) {
        try {
            const { taskId } = req.params;
            const userId = req.user.id; // Obtenido del middleware de autenticación

            if (!taskId) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de tarea no proporcionado'
                });
            }

            // Verificar si hay un timer activo
            const activeTimer = await taskTimeLogService.getActiveTimer(taskId, userId);

            if (activeTimer) {
                // Si hay timer activo, detenerlo
                const stoppedTimer = await taskTimeLogService.stopTimer(taskId, userId);
                return res.status(200).json({
                    status: 'success',
                    message: 'Timer detenido',
                    action: 'stopped',
                    timeLog: stoppedTimer
                });
            } else {
                // Si no hay timer activo, iniciarlo
                const startedTimer = await taskTimeLogService.startTimer(taskId, userId);
                return res.status(200).json({
                    status: 'success',
                    message: 'Timer iniciado',
                    action: 'started',
                    timeLog: startedTimer
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async getActiveTimer(req, res) {
        try {
            const { taskId } = req.params;
            const userId = req.user.id;

            if (!taskId) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de tarea no proporcionado'
                });
            }

            const activeTimer = await taskTimeLogService.getActiveTimer(taskId, userId);

            return res.status(200).json({
                status: 'success',
                activeTimer: activeTimer || null,
                isActive: !!activeTimer
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async getTimeLogsByTask(req, res) {
        try {
            const { taskId } = req.params;

            if (!taskId) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de tarea no proporcionado'
                });
            }

            const timeLogs = await taskTimeLogService.getTimeLogsByTask(taskId);

            return res.status(200).json({
                status: 'success',
                timeLogs
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async getTotalTimeForTask(req, res) {
        try {
            const { taskId } = req.params;

            if (!taskId) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de tarea no proporcionado'
                });
            }

            const totalTime = await taskTimeLogService.getTotalTimeForTask(taskId);

            return res.status(200).json({
                status: 'success',
                totalTime
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async getCurrentTime(req, res) {
        try {
            const { taskId } = req.params;
            const userId = req.user.id;

            // Obtener timer activo
            const activeTimer = await taskTimeLogService.getActiveTimer(taskId, userId);
            
            // Obtener tiempo total acumulado
            const totalTime = await taskTimeLogService.getTotalTimeForTask(taskId);

            let currentSessionTime = 0;
            if (activeTimer) {
                // Calcular tiempo de la sesión actual
                currentSessionTime = new Date() - new Date(activeTimer.start_time);
            }

            const totalCurrentTime = totalTime.totalTimeMs + currentSessionTime;

            return res.status(200).json({
                status: 'success',
                data: {
                    isActive: !!activeTimer,
                    totalTimeMs: totalCurrentTime,
                    totalTimeFormatted: taskTimeLogService.formatDuration(totalCurrentTime),
                    currentSessionMs: currentSessionTime,
                    activeTimer: activeTimer
                }
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

module.exports = new TaskTimeLogController();
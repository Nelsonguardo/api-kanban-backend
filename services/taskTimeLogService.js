const TaskTimeLog = require('../models/taskTimeLog');
const { Op } = require('sequelize');

async function startTimer(taskId, userId) {
    try {
        // Verificar si ya hay un timer activo para esta tarea y usuario
        const activeTimer = await TaskTimeLog.findOne({
            where: {
                task_id: taskId,
                user_id: userId,
                end_time: null
            }
        });

        if (activeTimer) {
            throw new Error('Ya existe un timer activo para esta tarea');
        }

        const timeLog = await TaskTimeLog.create({
            task_id: taskId,
            user_id: userId,
            start_time: new Date()
        });

        return timeLog;
    } catch (error) {
        throw error;
    }
}

async function stopTimer(taskId, userId) {
    try {
        // Buscar el timer activo
        const activeTimer = await TaskTimeLog.findOne({
            where: {
                task_id: taskId,
                user_id: userId,
                end_time: null
            }
        });

        if (!activeTimer) {
            throw new Error('No hay un timer activo para esta tarea');
        }

        // Actualizar con la hora de finalización
        await activeTimer.update({
            end_time: new Date()
        });

        return activeTimer;
    } catch (error) {
        throw error;
    }
}

async function getActiveTimer(taskId, userId) {
    try {
        const activeTimer = await TaskTimeLog.findOne({
            where: {
                task_id: taskId,
                user_id: userId,
                end_time: null
            }
        });

        return activeTimer;
    } catch (error) {
        throw error;
    }
}

async function getTimeLogsByTask(taskId) {
    try {
        const timeLogs = await TaskTimeLog.findAll({
            where: {
                task_id: taskId
            },
            order: [['created_at', 'DESC']]
        });

        return timeLogs;
    } catch (error) {
        throw error;
    }
}

async function getTimeLogsByUser(userId) {
    try {
        const timeLogs = await TaskTimeLog.findAll({
            where: {
                user_id: userId
            },
            order: [['created_at', 'DESC']]
        });

        return timeLogs;
    } catch (error) {
        throw error;
    }
}

async function getTotalTimeForTask(taskId) {
    try {
        const timeLogs = await TaskTimeLog.findAll({
            where: {
                task_id: taskId,
                end_time: {
                    [Op.not]: null
                }
            }
        });

        let totalTime = 0;
        timeLogs.forEach(log => {
            const duration = new Date(log.end_time) - new Date(log.start_time);
            totalTime += duration;
        });

        return {
            totalTimeMs: totalTime,
            totalTimeFormatted: formatDuration(totalTime)
        };
    } catch (error) {
        throw error;
    }
}

function formatDuration(milliseconds) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

module.exports = {
    startTimer,
    stopTimer,
    getActiveTimer,
    getTimeLogsByTask,
    getTimeLogsByUser,
    getTotalTimeForTask,
   formatDuration 
};
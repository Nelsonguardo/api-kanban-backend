const { Task, User, Column } = require('../models');

class TaskService {
    async getTaskById(id) {
        try {
            const taskData = await Task.findByPk(id,{
                include: [
                    {
                        model: User,
                        as: 'assignee',
                        attributes: ['id', 'name', 'email']
                    },
                    {
                        model: Column,
                        as: 'column',
                        attributes: ['id', 'name']
                    }
                ]
            });
            return taskData;
        } catch (error) {
            throw new Error('Error al obtener la tarea');
        }
    }
}

module.exports = new TaskService();
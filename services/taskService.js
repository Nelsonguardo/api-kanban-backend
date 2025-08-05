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

    async getTaskByColumn(columnId) {
        try {
            const tasks = await Task.findAll({
                where: { column_id: columnId },
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
            return tasks;
        } catch (error) {
            throw new Error('Error al obtener las tareas de la columna');
        }
    }

    async getTaskByBoard(boardId) {
        try {
            const tasks = await Task.findAll({
                include: [
                    {
                        model: Column,
                        as: 'column',
                        where: { board_id: boardId },
                        attributes: ['id', 'name']
                    },
                    {
                        model: User,
                        as: 'assignee',
                        attributes: ['id', 'name', 'email']
                    }
                ]
            });
            return tasks;
        } catch (error) {
            throw new Error('Error al obtener las tareas del tablero');
        }
    }

    async createTask(taskData) {
        try {
            const newTask = await Task.create(taskData);
            return newTask;
        } catch (error) {
            throw new Error('Error al crear la tarea');
        }
    }

    async getAllTasks() {
        try {
            const tasks = await Task.findAll({
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
            return tasks;
        } catch (error) {
            throw new Error('Error al obtener todas las tareas');
        }
    }
    async updateTask(id, taskData) {
        try {
            const updatedTask = await Task.update(taskData, {
                where: { id }
            });
            return updatedTask;
        } catch (error) {
            throw new Error('Error al actualizar la tarea');
        }
    }
    async deleteTask(id) {
        try {
            const deletedTask = await Task.destroy({
                where: { id }
            });
            return deletedTask;
        } catch (error) {
            throw new Error('Error al eliminar la tarea');
        }
    }

}

module.exports = new TaskService();
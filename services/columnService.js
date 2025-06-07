const Column = require('../models/column');

async function createColumn(data) {
    try {
        const column = await Column.create(data);
        return column;
    } catch (error) {
        throw error;
    }
}

async function getColumnById(id) {
    try {
        const column = await Column.findByPk(id);
        return column;
    } catch (error) {
        throw error;
    }
}

async function getAllColumns() {
    try {
        const columns = await Column.findAll();
        return columns;
    } catch (error) {
        throw error;
    }
}

async function updateColumn(id, data) {
    try {
        const column = await Column.findByPk(id);
        if (!column) {
            throw new Error('Column not found');
        }
        await column.update(data);
        return column;
    } catch (error) {
        throw error;
    }
}

async function deleteColumn(id) {
    try {
        const column = await Column.findByPk(id);
        if (!column) {
            throw new Error('Column not found');
        }
        await column.destroy();
        return { message: 'Column deleted successfully' };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createColumn,
    getColumnById,
    getAllColumns,
    updateColumn,
    deleteColumn
};
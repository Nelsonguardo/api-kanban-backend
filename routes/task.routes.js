const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const check = require('../middleware/auth');
const e = require('express');

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - column_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la tarea
 *         title:
 *           type: string
 *           description: Título de la tarea
 *         description:
 *           type: string
 *           description: Descripción de la tarea
 *         column_id:
 *           type: integer
 *           description: ID de la columna asociada
 *         assignee_id:
 *           type: integer
 *           description: ID del usuario asignado a la tarea (opcional)
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la tarea
 *
 * tags:
 *   - name: Tareas
 *     description: Operaciones con tareas
 */

router.get('/task/:id', check.auth, taskController.getTaskById);

module.exports = router;
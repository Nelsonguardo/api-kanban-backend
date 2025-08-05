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
/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tareas]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 */     

/**
 * @swagger
 * /tasks/column/{columnId}:
 *   get:
 *     summary: Obtener tareas por ID de columna
 *     tags: [Tareas]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *         description: ID de la columna para filtrar las tareas
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tareas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 */
/**
 * @swagger
 * /tasks/board/{boardId}:
 *   get:
 *     summary: Obtener tareas por ID de tablero
 *     tags: [Tareas]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: ID del tablero para filtrar las tareas
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tareas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 */
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tareas]
 *     security:
 *       - jwtAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 */ 
/**
 * @swagger
 * /task:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     security:
 *       - jwtAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la tarea
 *               description:
 *                 type: string
 *                 description: Descripción de la tarea
 *               column_id:
 *                 type: integer
 *                 description: ID de la columna asociada
 *               assignee_id:
 *                 type: integer
 *                 description: ID del usuario asignado a la tarea (opcional)
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 description: Prioridad de la tarea (opcional)
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 */
/**
 * @swagger
 * /task/{id}:
 *   put:
 *     summary: Actualizar una tarea por ID
 *     tags: [Tareas]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nuevo título de la tarea
 *               description:
 *                 type: string
 *                 description: Nueva descripción de la tarea
 *               column_id:
 *                 type: integer
 *                 description: Nuevo ID de la columna asociada
 *               assignee_id:
 *                 type: integer
 *                 description: Nuevo ID del usuario asignado a la tarea
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 description: Nueva prioridad de la tarea (opcional)
 * responses:
 *   200:
 *     description: Tarea actualizada exitosamente
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             task:
 *               $ref: '#/components/schemas/Task'
 */

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     tags: [Tareas]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea a eliminar
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 */

router.get('/task/:id', check.auth, taskController.getTaskById);
router.get('/tasks/column/:columnId', check.auth, taskController.getTasksByColumn);
router.get('/tasks/board/:boardId', check.auth, taskController.getTasksByBoard);
router.get('/tasks', check.auth, taskController.getAllTasks);
router.post('/task', check.auth, taskController.createTask);
router.put('/task/:id', check.auth, taskController.updateTask);
router.delete('/task/:id', check.auth, taskController.deleteTask);

module.exports = router;
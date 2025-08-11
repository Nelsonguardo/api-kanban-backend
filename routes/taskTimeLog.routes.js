const express = require('express');
const router = express.Router();
const taskTimeLogController = require('../controllers/taskTimeLogController');
const check = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     TaskTimeLog:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado del registro de tiempo
 *         task_id:
 *           type: integer
 *           description: ID de la tarea
 *         user_id:
 *           type: integer
 *           description: ID del usuario
 *         start_time:
 *           type: string
 *           format: date-time
 *           description: Hora de inicio
 *         end_time:
 *           type: string
 *           format: date-time
 *           description: Hora de finalización (null si está activo)
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del registro
 */

/**
 * @swagger
 * tags:
 *   name: Timer de Tareas
 *   description: Cronometraje de tiempo en tareas
 */

/**
 * @swagger
 * /task/{taskId}/timer/toggle:
 *   post:
 *     summary: Iniciar o detener el timer de una tarea
 *     tags: [Timer de Tareas]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Timer iniciado o detenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Timer iniciado
 *                 action:
 *                   type: string
 *                   enum: [started, stopped]
 *                 timeLog:
 *                   $ref: '#/components/schemas/TaskTimeLog'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /task/{taskId}/timer/status:
 *   get:
 *     summary: Obtener el estado del timer de una tarea
 *     tags: [Timer de Tareas]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Estado del timer obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 activeTimer:
 *                   $ref: '#/components/schemas/TaskTimeLog'
 *                 isActive:
 *                   type: boolean
 */

/**
 * @swagger
 * /task/{taskId}/timelogs:
 *   get:
 *     summary: Obtener todos los registros de tiempo de una tarea
 *     tags: [Timer de Tareas]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Registros de tiempo obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 timeLogs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TaskTimeLog'
 */

/**
 * @swagger
 * /task/{taskId}/timer/total:
 *   get:
 *     summary: Obtener el tiempo total invertido en una tarea
 *     tags: [Timer de Tareas]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tiempo total obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 totalTime:
 *                   type: object
 *                   properties:
 *                     totalTimeMs:
 *                       type: integer
 *                       description: Tiempo total en milisegundos
 *                     totalTimeFormatted:
 *                       type: string
 *                       description: Tiempo total formateado (HH:MM:SS)
 */

/**
 * @swagger
 * /task/{taskId}/timer/current:
 *   get:
 *     summary: Obtener tiempo actual en tiempo real
 *     tags: [Timer de Tareas]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tiempo actual obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     isActive:
 *                       type: boolean
 *                       description: Indica si el timer está activo
 *                     totalTimeMs:
 *                       type: integer
 *                       description: Tiempo total acumulado en milisegundos (incluyendo sesión actual)
 *                     totalTimeFormatted:
 *                       type: string
 *                       description: Tiempo total formateado (HH:MM:SS)
 *                       example: "02:15:30"
 *                     currentSessionMs:
 *                       type: integer
 *                       description: Tiempo de la sesión actual en milisegundos
 *                     activeTimer:
 *                       $ref: '#/components/schemas/TaskTimeLog'
 *       400:
 *         description: ID de tarea no proporcionado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/task/:taskId/timer/toggle', check.auth, taskTimeLogController.toggleTimer);
router.get('/task/:taskId/timer/status', check.auth, taskTimeLogController.getActiveTimer);
router.get('/task/:taskId/timelogs', check.auth, taskTimeLogController.getTimeLogsByTask);
router.get('/task/:taskId/timer/total', check.auth, taskTimeLogController.getTotalTimeForTask);
router.get('/task/:taskId/timer/current', check.auth, taskTimeLogController.getCurrentTime);

module.exports = router;
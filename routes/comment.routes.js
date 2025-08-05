// routes/comment.routes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const check = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - content
 *         - task_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado del comentario
 *         content:
 *           type: string
 *           description: Contenido del comentario
 *         task_id:
 *           type: integer
 *           description: ID de la tarea asociada
 *         user_id:
 *           type: integer
 *           description: ID del usuario que hizo el comentario (se toma del token del usuario logueado)
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del comentario
 */
 /**
 * @swagger
 * tags:
 *   name: Comentarios
 *   description: Manejo de comentarios
 */
/** * @swagger
 * /comment:
 *   post:
 *     summary: Crear un nuevo comentario
 *     tags: [Comentarios]
 *     security:
 *       - jwtAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               task_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente
 */
/** * @swagger
 * /comments/{taskId}:
 *   get:
 *     summary: Obtener comentarios por ID de tarea
 *     tags: [Comentarios]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea para obtener sus comentarios
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida exitosamente
 */
router.post('/comment', check.auth, commentController.createComment);
router.get('/comments/:taskId', check.auth, commentController.getCommentsByTaskId);



module.exports = router;
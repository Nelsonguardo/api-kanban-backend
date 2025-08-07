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

/**
 * @swagger
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

/**
 * @swagger
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

/**
 * @swagger
 * /comment/{id}:
 *   get:
 *     summary: Obtener un comentario por ID
 *     tags: [Comentarios]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Comentario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comentario no encontrado
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /comment/{id}:
 *   put:
 *     summary: Actualizar un comentario por ID
 *     tags: [Comentarios]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comentario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Nuevo contenido del comentario
 *     responses:
 *       200:
 *         description: Comentario actualizado exitosamente
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
 *                   example: Comentario actualizado correctamente
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comentario no encontrado
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     summary: Eliminar un comentario por ID
 *     tags: [Comentarios]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comentario a eliminar
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente
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
 *                   example: Comentario eliminado correctamente
 *       404:
 *         description: Comentario no encontrado
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Obtener todos los comentarios
 *     tags: [Comentarios]
 *     security:
 *       - jwtAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los comentarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       401:
 *         description: No autorizado
 */

router.post('/comment', check.auth, commentController.createComment);
router.get('/comments/:taskId', check.auth, commentController.getCommentsByTaskId);
router.get('/comment/:id', check.auth, commentController.getCommentById);
router.put('/comment/:id', check.auth, commentController.updateComment);
router.delete('/comment/:id', check.auth, commentController.deleteComment);
router.get('/comments', check.auth, commentController.getAllComments);

module.exports = router;
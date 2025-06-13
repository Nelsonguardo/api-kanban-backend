const express = require('express');
const router = express.Router();
const columnController = require('../controllers/columnController');
const check = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Column:
 *       type: object
 *       required:
 *         - name
 *         - board_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la columna
 *         name:
 *           type: string
 *           description: Nombre de la columna
 *         board_id:
 *           type: integer
 *           description: ID del tablero asociado
 *         order_index:
 *           type: integer
 *           description: Índice de orden de la columna
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la columna
 * 
 * tags:
 *   - name: Columnas
 *     description: Operaciones con columnas
 */

/**
 * @swagger
 * /columns:
 *   get:
 *     summary: Obtener todas las columnas
 *     tags: [Columnas]
 *     security:
 *       - jwtAuth: []
 *     responses:
 *       200:
 *         description: Lista de columnas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 columns:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Column'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: No se encontraron columnas
 */

/**
 * @swagger
 * /column/{id}:
 *   get:
 *     summary: Obtener una columna por ID
 *     tags: [Columnas]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la columna
 *     responses:
 *       200:
 *         description: Columna obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 column:
 *                   $ref: '#/components/schemas/Column'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Columna no encontrada
 */

/**
 * @swagger
 * /column:
 *   post:
 *     summary: Crear una nueva columna
 *     tags: [Columnas]
 *     security:
 *       - jwtAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la columna
 *               board_id:
 *                 type: integer
 *                 description: ID del tablero asociado
 *               order_index:
 *                 type: integer
 *                 description: Índice para ordenar la columna (opcional)
 *     responses:
 *       201:
 *         description: Columna creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 column:
 *                   $ref: '#/components/schemas/Column'
 *       401:
 *         description: No autorizado
 *       400:
 *         description: Datos insuficientes o inválidos
 */

/**
 * @swagger
 * /column/{id}:
 *   put:
 *     summary: Actualizar una columna por ID
 *     tags: [Columnas]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la columna a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre actualizado de la columna
 *               order_index:
 *                 type: integer
 *                 description: Nuevo índice de orden (opcional)
 *     responses:
 *       200:
 *         description: Columna actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 column:
 *                   $ref: '#/components/schemas/Column'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Columna no encontrada
 */

/**
 * @swagger
 * /column/{id}:
 *   delete:
 *     summary: Eliminar una columna por ID
 *     tags: [Columnas]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la columna a eliminar
 *     responses:
 *       200:
 *         description: Columna eliminada exitosamente
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
 *                   example: Columna eliminada correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Columna no encontrada
 */

router.get('/columns', check.auth, columnController.getAllColumns);
router.get('/column/:id', check.auth, columnController.getOneColumn);
router.post('/column', check.auth, columnController.createColumn);
router.put('/column/:id', check.auth, columnController.updateColumn);
router.delete('/column/:id', check.auth, columnController.deleteColumn);

module.exports = router;
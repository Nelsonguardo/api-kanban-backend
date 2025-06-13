const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const check = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Board:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado del tablero
 *         title:
 *           type: string
 *           description: Título del tablero
 *         owner_id:
 *           type: integer
 *           description: ID del propietario (se toma del token del usuario logueado)
 *           readOnly: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del tablero
 * 
 * tags:
 *   - name: Tableros
 *     description: Operaciones con tableros
 */

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Obtener todos los tableros
 *     tags: [Tableros]
 *     security:
 *       - jwtAuth: []
 *     responses:
 *       200:
 *         description: Lista de tableros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 boards:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Board'
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /board/{id}:
 *   get:
 *     summary: Obtener un tablero por ID
 *     tags: [Tableros]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tablero
 *     responses:
 *       200:
 *         description: Tablero encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 board:
 *                   $ref: '#/components/schemas/Board'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Tablero no encontrado
 */

/**
 * @swagger
 * /board:
 *   post:
 *     summary: Crear un nuevo tablero
 *     tags: [Tableros]
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
 *                 description: Título del tablero
 *     responses:
 *       201:
 *         description: Tablero creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 board:
 *                   $ref: '#/components/schemas/Board'
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /board/{id}:
 *   put:
 *     summary: Actualizar un tablero por ID
 *     tags: [Tableros]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tablero a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título del tablero
 *     responses:
 *       200:
 *         description: Tablero actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 board:
 *                   $ref: '#/components/schemas/Board'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Tablero no encontrado
 */

/**
 * @swagger
 * /board/{id}:
 *   delete:
 *     summary: Eliminar un tablero por ID
 *     tags: [Tableros]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tablero a eliminar
 *     responses:
 *       200:
 *         description: Tablero eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Tablero no encontrado
 */
//swagger para asignación de colaboradores
/**
 * @swagger
 * /collaborator:
 *   post:
 *     summary: Asignar un colaborador a un tablero
 *     tags: [Tableros]
 *     security:
 *       - jwtAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boardId:
 *                 type: integer
 *                 description: ID del tablero al que se asigna el colaborador
 *               userId:
 *                 type: integer
 *                 description: ID del usuario a asignar como colaborador
 *     responses:
 *       201:
 *         description: Colaborador asignado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       401:
 *         description: No autorizado
 */
//swagger para eliminar colaborador
/**
 * @swagger
 * /board/{boardId}/collaborator/{userId}:
 *   delete:
 *     summary: Eliminar un colaborador de un tablero
 *     tags: [Tableros]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tablero del que se eliminará el colaborador
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar como colaborador
 *     responses:
 *       200:
 *         description: Colaborador eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       401:
 *         description: No autorizado
 */

router.get('/boards', check.auth, boardController.getAllBoards);
router.get('/board/:id', check.auth, boardController.getOneBoard);
router.post('/board', check.auth, boardController.createBoard);
router.put('/board/:id', check.auth, boardController.updateBoard);
router.delete('/board/:id', check.auth, boardController.deleteBoard);

//rutas asignación de colaboradores
router.post('/collaborator', check.auth, boardController.createBoardUser);
router.delete('/board/:boardId/collaborator/:userId', check.auth, boardController.deleteBoardUser);


module.exports = router;
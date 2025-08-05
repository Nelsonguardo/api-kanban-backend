const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const boardRoutes = require('./board.routes');
const columnRoutes = require('./column.routes');
const taskRoutes = require('./task.routes');

router.use(userRoutes);
router.use(boardRoutes);
router.use(columnRoutes);
router.use(taskRoutes);

module.exports = router;
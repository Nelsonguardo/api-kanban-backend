// routes/index.js
const express = require('express');
const router = express.Router();

// Importing route modules
const userRoutes = require('./user.routes');
const boardRoutes = require('./board.routes');
const columnRoutes = require('./column.routes');
const taskRoutes = require('./task.routes');
const commentRoutes = require('./comment.routes');

// Setting up routes
router.use(userRoutes);
router.use(boardRoutes);
router.use(columnRoutes);
router.use(taskRoutes);
router.use(commentRoutes);

// Export the router
module.exports = router;
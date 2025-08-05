// controllers/commentController.js
const CommentService = require('../services/commentService');

// Comment Controller
// This controller handles HTTP requests related to comments, including creation, retrieval, updating, and deletion
class CommentController {

    // Create a new comment
    // Accepts comment data and returns the created comment
    async createComment(req, res) {
        try {
            // Extract comment data from the request body
            // and set the user ID from the authenticated user
            const commentData = req.body;
            const user = req.user; // Assuming user is set by authentication middleware
            commentData.user_id = user.id; // Set the user ID from the authenticated user

            // Validate the task ID
            if (!commentData.task_id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de tarea no proporcionado'
                });
            }
            // Validate required fields
            if (!commentData.content || !commentData.user_id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Faltan datos requeridos'
                });
            }
            // Create the comment using the service
            const comment = await CommentService.createComment(commentData);
            return res.status(201).json({
                status: 'success',
                comment
            });

        } catch (error) {
            // Handle errors
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    // Retrieve a comment by its ID
    // Accepts a comment ID and returns the comment if found
    async getCommentsByTaskId(req, res) {
        try {
            // Retrieve comments for a specific task
            // The task ID is provided in the request parameters
            const taskId = req.params.taskId;
            // Validate the task ID
            if (!taskId) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de tarea no proporcionado'
                });
            }
            // Get comments for the task using the service
            const comments = await CommentService.getCommentsByTaskId(taskId);
            return res.status(200).json({
                status: 'success',
                comments
            });
        } catch (error) {
            // Handle errors
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

module.exports = new CommentController();
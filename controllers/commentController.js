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

    // Get a single comment by ID
    async getCommentById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de comentario no proporcionado'
                });
            }
            
            const comment = await CommentService.getCommentById(id);
            if (!comment) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Comentario no encontrado'
                });
            }
            
            return res.status(200).json({
                status: 'success',
                comment
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    // Update a comment by ID
    async updateComment(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            
            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de comentario no proporcionado'
                });
            }
            
            if (!updateData.content) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Contenido del comentario es requerido'
                });
            }
            
            // Verificar que el comentario existe antes de actualizar
            const existingComment = await CommentService.getCommentById(id);
            if (!existingComment) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Comentario no encontrado'
                });
            }
            
            const updatedComment = await CommentService.updateComment(id, updateData);
            return res.status(200).json({
                status: 'success',
                message: 'Comentario actualizado correctamente',
                comment: updatedComment
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    // Delete a comment by ID
    async deleteComment(req, res) {
        try {
            const { id } = req.params;
            
            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de comentario no proporcionado'
                });
            }
            
            // Verificar que el comentario existe antes de eliminar
            const existingComment = await CommentService.getCommentById(id);
            if (!existingComment) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Comentario no encontrado'
                });
            }
            
            await CommentService.deleteComment(id);
            return res.status(200).json({
                status: 'success',
                message: 'Comentario eliminado correctamente'
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    // Get all comments (optional)
    async getAllComments(req, res) {
        try {
            const comments = await CommentService.getAllComments();
            return res.status(200).json({
                status: 'success',
                comments
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

module.exports = new CommentController();
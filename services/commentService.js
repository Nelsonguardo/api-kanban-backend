const { Comment, User, Task } = require('../models');

// Comment Service
// This service handles the business logic for comments, including creation, retrieval, updating, and deletion
class CommentService {

    // Create a new comment
    // Accepts comment data and returns the created comment
    async createComment(commentData) {
        try {
            const comment = await Comment.create(commentData);
            return comment;
        } catch (error) {
            throw error;
        }
    }

    // Retrieve a comment by its ID
    // Accepts a comment ID and returns the comment if found
    async getCommentById(commentId) {
        try {
            const comment = await Comment.findByPk(commentId);
            return comment;
        } catch (error) {
            throw error;
        }
    }

    // Retrieve all comments for a specific task
    // Accepts a task ID and returns all comments associated with that task
    async getCommentsByTaskId(taskId) {
        try {
            const comments = await Comment.findAll({
                where: { task_id: taskId },
                order: [['created_at', 'DESC']]
            });
            return comments;
        } catch (error) {
            throw error;
        }
    }

    // Retrieve all comments
    // Returns an array of all comments in the system
    async getAllComments() {
        const comments = await Comment.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Task,
                    as: 'task',
                    attributes: ['id', 'title', 'description', 'priority']
                }
            ]
        });
        return comments;
    }

    // Update a comment
    // Accepts a comment ID and updated data and returns the updated comment
    async updateComment(commentId, updateData) {
        try {
            const [updated] = await Comment.update(updateData, {
                where: { id: commentId }
            });
            return updated;
        } catch (error) {
            throw error;
        }
    }

    // Delete a comment
    // Accepts a comment ID and deletes the comment, returning a success message
    async deleteComment(commentId) {
        try {
            const deleted = await Comment.destroy({
                where: { id: commentId }
            });
            return deleted;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CommentService();
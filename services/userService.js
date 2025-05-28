const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserService {
    async getUserById(id) {
        try {
            const user = await User.findByPk(id, {
                attributes: { exclude: ['password'] } // No enviamos el password
            });
            return user;
        } catch (error) {
            throw new Error('Error al obtener el usuario');
        }
    }
    async createUser(userData) {
        try {
            const user = await User.create(userData);
            // Convertir a JSON y excluir el password
            const { password, ...userWithoutPassword } = user.toJSON();
            return userWithoutPassword;
        } catch (error) {
            throw new Error('Error al crear el usuario');
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await User.findOne({
                where: { email },
                //attributes: { exclude: ['password'] } // No enviamos el password
            });
            return user;
        } catch (error) {
            throw new Error('Error al obtener el usuario por correo');
        }
    }

    async getAllUsers() {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['password'] } // No enviamos el password
            });
            return users;
        } catch (error) {
            throw new Error('Error al obtener todos los usuarios');
        }
    }

    async updateUser(userToUpdate) {
        try {
            const { id, ...updateData } = userToUpdate;
            if (updateData.password) {
                let pwd = await bcrypt.hash(updateData.password, 10);
                updateData.password = pwd;
            } else {
                delete updateData.password;
            }

            await User.update(updateData, {
                where: { id }
            });

            // Fetch and return the updated user without password
            const updatedUser = await User.findByPk(id, {
                attributes: { exclude: ['password'] }
            });

            return updatedUser;

        } catch (error) {
            throw new Error('Error al actualizar el usuario');

        }
    }

    async deleteUser(id) {
        try {
            const user = await User.destroy({
                where: { id }
            });
            return user;
        } catch (error) {
            throw new Error('Error al eliminar el usuario');
        }
    }
}

module.exports = new UserService();
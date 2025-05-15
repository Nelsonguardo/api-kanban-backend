const User = require('../models/user');

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
}

module.exports = new UserService();
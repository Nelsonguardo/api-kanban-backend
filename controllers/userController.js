const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');

class UserController {
    async getUser(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de usuario no proporcionado'
                });
            }
            const user = await userService.getUserById(id);

            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Usuario no encontrado'
                });
            }

            return res.status(200).json({
                status: 'success',
                user
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
    async createUser(req, res) {
        try {
            let params = req.body;
            if (!params.name || !params.email || !params.password || !params.role) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Faltan datos requeridos'
                });
            }
            const existingUser = await userService.getUserByEmail(params.email);
            if (existingUser) {
                return res.status(409).json({
                    status: 'error',
                    message: 'El correo ya está en uso'
                });
            }

            let pwd = await bcrypt.hash(params.password, 10);

            const userData = {
                name: params.name,
                email: params.email,
                password: pwd,
                role: params.role
            };

            const user = await userService.createUser({
                ...userData
            });
            return res.status(201).json({
                status: 'success',
                user
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async Login(req, res) {
        try {
            //Recoger los datos de la peticion
            let params = req.body;
            //Revisar si faltan datos
            if (!params.email || !params.password) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Faltan datos requeridos'
                });
            }
            // comprobar si el usuario existe
            const user = await userService.getUserByEmail(params.email);
            if (!user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Usuario no existe'
                });
            }
            // comprobar la password
            const pwd = bcrypt.compareSync(params.password, user.password);
            if (!pwd) {
                return res.status(400).send({
                    status: "error",
                    message: "La password es incorrecta"
                })
            }
            //Devolver token
            const token = jwt.createToken(user);
            //Devolver datos del usuario
            return res.status(200).send({
                status: "success",
                message: "Usuario logueado correctamente",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            if (!users || users.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se encontraron usuarios'
                });
            }
            return res.status(200).json({
                status: 'success',
                users
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            let params = req.body;

            // Validar que existe el ID
            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de usuario no proporcionado'
                });
            }

            // Verificar que el usuario a actualizar existe
            const user = await userService.getUserById(id);
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Usuario no encontrado'
                });
            }

            // Solo verificar email si se está intentando actualizar
            if (params.email) {
                // Buscar si el email existe en la base de datos
                const existingUser = await userService.getUserByEmail(params.email);

                // Si existe un usuario con ese email Y no es el mismo que estamos actualizando
                if (existingUser && existingUser.id !== parseInt(id)) {
                    return res.status(409).json({
                        status: 'error',
                        message: 'El correo ya está en uso por otro usuario'
                    });
                }
            }
                       
            const userUpdated = await userService.updateUser({ ...params, id });

            if (!userUpdated) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se pudo actualizar el usuario'
                });
            }

            return res.status(200).json({
                status: 'success',
                user: userUpdated
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message,
            });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            // Validar que existe el ID
            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID de usuario no proporcionado'
                });
            }

            // Verificar que el usuario a eliminar existe
            const user = await userService.getUserById(id);
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Usuario no encontrado'
                });
            }

            await userService.deleteUser(id);
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se pudo eliminar el usuario'
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Usuario eliminado correctamente'
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

module.exports = new UserController();
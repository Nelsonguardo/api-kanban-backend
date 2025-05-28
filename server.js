const app = require('./app');
const sequelize = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Iniciar el servidor
async function startServer() {
    try {
        // Verificar conexión a la base de datos
        await sequelize.authenticate();
        console.log('Database connection successful');

        // Sincronizar modelos con la base de datos
        // En desarrollo puedes usar {force: true} para recrear las tablas
        await sequelize.sync();
        console.log('Database synchronized');

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
    }
}

startServer();
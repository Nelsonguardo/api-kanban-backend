const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false, // Desactiva los logs SQL en consola
        define: {
            timestamps: true, // Agrega created_at y updated_at automáticamente
            underscored: true // Usa snake_case en lugar de camelCase para nombres de columnas
        }
    }
);

// Función para probar la conexión
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente con la base de datos.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
};

// Ejecuta el test de conexión
testConnection();

module.exports = sequelize;
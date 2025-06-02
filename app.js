const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Crear la app
const app = express();

// Configurar cors
app.use(cors());

// Convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Importar rutas
const userRoutes = require('./routes/user.routes');
const boardRoutes = require('./routes/board.routes');

// Usar rutas
app.use('/api', userRoutes);
app.use('/api', boardRoutes);

// Ruta de prueba
app.get('/test', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to Kanban API'
    });
});

// Exportar app
module.exports = app;
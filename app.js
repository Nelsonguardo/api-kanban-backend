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

// Importar rutaso
const routes = require('./routes');
// Usar todas las rutas agrupadas en '/api'
app.use('/api', routes);

// Ruta de prueba
app.get('/test', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to Kanban API'
    });
});

// Exportar app
module.exports = app;
const express = require('express');
const cors = require('cors');

// Crear la app
const app = express();

// Configurar cors
app.use(cors());

// Convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Ruta de prueba
app.get('/test', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to Kanban API'
    });
});

// Exportar app
module.exports = app;
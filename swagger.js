const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Kanban',
      version: '1.0.0',
      description: 'API REST para sistema Kanban'
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server'
      }
    ]
  },
  apis: ['./routes/*.js'] // Lee la documentación desde los archivos de rutas
};

module.exports = swaggerJSDoc(options);
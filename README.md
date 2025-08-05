# Kanban API Backend

Este proyecto es una API backend para gestionar tableros Kanban. Permite crear, leer, actualizar y eliminar tareas y columnas.

## Características

- CRUD de tareas y columnas
- Autenticación de usuarios
- API RESTful
- Documentación con Swagger

## Tecnologías

- Node.js
- Express
- MySQL
- JWT

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/Nelsonguardo/api-kanban-backend.git
    cd api-kanban-backend
    ```
2. Instala las dependencias:
    ```bash
    npm install
    ```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables (ajusta los valores según tu entorno):

    ```env
    PORT=3000
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=kanban
    JWT_SECRET=tu_clave_secreta
    ```

2. Crea la base de datos en MySQL ejecutando:
    ```sql
    CREATE DATABASE kanban;
    ```
   Las tablas necesarias se crearán automáticamente al iniciar la API si el código incluye la lógica de inicialización. Si no, consulta el archivo de modelos o documentación adicional para los scripts de creación de tablas.

## Ejecución

```bash
npm start
```

La API estará disponible en `http://localhost:3000`.

## Endpoints principales

- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Iniciar sesión
- `GET /boards` - Listar tableros
- `POST /boards` - Crear tablero
- `GET /tasks` - Listar tareas
- `POST /tasks` - Crear tarea

## Notas adicionales

- Es necesario crear la base de datos en MySQL antes de ejecutar la API. Las tablas pueden generarse automáticamente si el proyecto lo soporta, o deberás crearlas manualmente.
- Si necesitas documentación interactiva, accede a `/api-docs` para ver Swagger UI.

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o haz un pull request.

## Licencia

MIT
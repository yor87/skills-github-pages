const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const citasRoutes = require('./routes/citasRoutes.js');
const comentariosRoutes = require('./routes/comentariosRoutes.js'); // Importar rutas de comentarios

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/comentarios', comentariosRoutes); // Usar rutas de comentarios

// Servir archivos estáticos desde el frontend
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Rutas (se agregarán después)
app.get('/', (req, res) => res.send('Bienvenido a la API'));

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    try {
        await db.connect();
        console.log('✅ Base de datos conectada.');
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
    }
});

// models/Comentario.js
const pool = require('../config/db'); // Reutiliza la conexión de db.js

// Crear tabla si no existe
const createComentarioTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS comentarios (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(100) NOT NULL,
            comentario TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `;
    await pool.query(query);
};

// Crear un nuevo comentario
const createComentario = async (nombre, mensaje, user_id = null) => {
    try {
        const res = await pool.query(
            'INSERT INTO comentarios (name, comentario) VALUES ($1, $2) RETURNING *',
            [nombre, mensaje]
        );
        return res.rows[0];
    } catch (error) {
        console.log("error", error);
        throw error;
    }
};

// Obtener comentarios por usuario (si es necesario)
const getComentariosByUser = async (user_id) => {
    try {
        // const res = await pool.query(
        //     'SELECT * FROM comentarios WHERE user_id = $1 ORDER BY fecha DESC',
        //     [user_id]
        // );
        const res = await pool.query(
            'SELECT * FROM comentarios WHERE name = $1 ORDER BY created_at DESC',
            [user_id]
        );
        return res.rows;
    } catch (error) {
        throw error;
    }
};

// Obtener todos los comentarios
const getAllComentarios = async () => {
    try {
        const res = await pool.query('SELECT * FROM comentarios ORDER BY created_at DESC');
        return res.rows;
    } catch (error) {
        throw error;
    }
};

// Crear tabla al iniciar
createComentarioTable().then(() => console.log("✅ Tabla 'comentario' lista")).catch(console.error);

module.exports = { createComentario, getComentariosByUser, getAllComentarios };
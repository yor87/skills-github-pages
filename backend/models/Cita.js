const pool = require('../config/db');

// Crear tabla si no existe
const createCitasTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS citas (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES users(id) ON DELETE CASCADE,
            date TIMESTAMP NOT NULL,
            description TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `;
    await pool.query(query);
};

// Crear una nueva cita
const createCitas = async (user_id, date, description) => {
    try {
        const result = await pool.query(
            'INSERT INTO citas (user_id, date, description) VALUES ($1, $2, $3) RETURNING *',
            [user_id, date, description]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Obtener todas las citas de un usuario
const getCitasByUser = async (user_id) => {
    const result = await pool.query(
        'SELECT * FROM citas WHERE user_id = $1 ORDER BY date ASC',
        [user_id]
    );
    return result.rows;
};

// Crear tabla al iniciar
createCitasTable().then(() => console.log("✅ Tabla 'citas' lista")).catch(console.error);

module.exports = { createCitas, getCitasByUser };

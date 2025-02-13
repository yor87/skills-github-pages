const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Crear tabla si no existe
const createUserTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `;
    await pool.query(query);
};

// Registrar un nuevo usuario
const createUser = async (name, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hashedPassword]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Buscar un usuario por email
const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

// Crear tabla al iniciar
createUserTable().then(() => console.log("✅ Tabla 'users' lista")).catch(console.error);

module.exports = { createUser, getUserByEmail };

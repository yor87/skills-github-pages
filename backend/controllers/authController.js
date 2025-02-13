const { createUser, getUserByEmail } = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Crear nuevo usuario
        const newUser = await createUser(name, email, password);

        // Generar token JWT
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: "Usuario registrado con éxito", token });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

// Iniciar sesión
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        // Verificar si el usuario existe
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Generar token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

// Obtener perfil del usuario autenticado
const getUserProfile = async (req, res) => {
    try {
        res.json({ user: req.user });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };

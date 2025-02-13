const { createComentario, getComentariosByUser } = require('../models/Comentario');

// Crear un nuevo comentario
const createComentarioHandler = async (req, res) => {
    try {
        const { nombre,  mensaje } = req.body;

        // Validación básica
        if (!nombre || !mensaje) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Crear el comentario en la base de datos
        const nuevoComentario = await createComentario(nombre, mensaje);
        res.status(201).json({ message: "Comentario creado con éxito", comentario: nuevoComentario });

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

// Obtener todos los comentarios de un usuario (si es necesario)
const getComentariosHandler = async (req, res) => {
    try {
        const user_id = req.user.id; // Si los comentarios están asociados a un usuario
        const comentarios = await getComentariosByUser(user_id);
        res.json(comentarios);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

// Obtener todos los comentarios (sin filtrar por usuario)
const getAllComentariosHandler = async (req, res) => {
    try {
        const comentarios = await getComentariosByUser(); // Si no requiere user_id
        res.json(comentarios);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

module.exports = { createComentarioHandler, getComentariosHandler, getAllComentariosHandler };
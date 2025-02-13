const { createCitas, getCitasByUser } = require('../models/Cita');

// Crear una nueva cita
const createCitaHandler = async (req, res) => {
    try {
        const { date, description } = req.body;
        const user_id = req.user.id; // ID del usuario autenticado

        // Validación básica
        if (!date || !description) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const newCitas = await createCitas(user_id, date, description);
        res.status(201).json({ message: "Cita creada con éxito", citas: newCitas });

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

// Obtener todas las citas de un usuario autenticado
const getCitasHandler = async (req, res) => {
    try {
        const user_id = req.user.id;
        const citas = await getCitasByUser(user_id);
        res.json(citas);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

module.exports = { createCitaHandler, getCitasHandler };

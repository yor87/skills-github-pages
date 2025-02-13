const express = require('express');
const { createCitaHandler, getCitasHandler } = require('../controllers/citasController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Crear una nueva cita (requiere autenticación)
router.post('/create', authMiddleware, createCitaHandler);

// Obtener todas las citas del usuario autenticado
router.get('/my', authMiddleware, getCitasHandler);

module.exports = router;

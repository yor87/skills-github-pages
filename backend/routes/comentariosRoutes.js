// routes/comentariosRoutes.js
const express = require('express');
const { createComentarioHandler, getComentariosHandler, getAllComentariosHandler } = require('../controllers/comentariosController');
const authMiddleware = require('../middlewares/authMiddleware'); // Si los comentarios requieren autenticación

const router = express.Router();

// Crear un nuevo comentario (opcionalmente con autenticación)
//router.post('/create', authMiddleware, createComentarioHandler); // Si requiere autenticación
router.post('/create', createComentarioHandler); // Si no requiere autenticación

// Obtener todos los comentarios del usuario autenticado (opcional)
router.get('/my', authMiddleware, getComentariosHandler); // Si requiere autenticación

// Obtener todos los comentarios (sin filtrar por usuario)
router.get('/all', getAllComentariosHandler); // No requiere autenticación

module.exports = router;
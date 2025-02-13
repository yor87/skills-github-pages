const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser); // Registrar usuario
router.post('/login', loginUser); // Iniciar sesión
router.get('/profile', authMiddleware, getUserProfile); // Obtener perfil del usuario autenticado

module.exports = router;

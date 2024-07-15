const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/cadastro', userController.registrarUsuario);

router.get('/usuarios/:id', userController.buscarUsuarioPorId);

router.get('/buscarTodosUsuarios', userController.buscarTodosUsuarios);

router.delete('/usuarios/:id', userController.deletarUsuario);

module.exports = router;
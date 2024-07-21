const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const sendPasswordController = require('../controllers/sendPasswordController')

router.post('/cadastro', userController.registrarUsuario);
router.get('/usuarios/:id', userController.buscarUsuarioPorId);
router.get('/buscartodosuarios', userController.buscarTodosUsuarios);
router.put('/usuarios/:id', userController.atualizarUsuario);
router.delete('/usuarios/:id', userController.deletarUsuario);

router.post('/enviosenha', sendPasswordController.sendPassword);

module.exports = router;
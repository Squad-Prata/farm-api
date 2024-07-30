const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const sendPasswordController = require('../controllers/sendPasswordController');
const autheConfig = require('../middlewares/auth');

// Cadastros de usuarios
router.post('/cadastro', userController.registrarUsuario);

// Login do usuarios
router.post('/login', userController.loginUsuario);

// Buscar de usuarios
router.get('/usuarios/:id', autheConfig.authenticateToken, userController.buscarUsuarioPorId);
router.get('/buscartodosusuarios', userController.buscarTodosUsuarios);

// Atualização de cadastro
router.put('/usuarios/:id', autheConfig.authenticateToken, userController.atualizarUsuario);

// Deletar usuarios
router.delete('/usuarios/:id', autheConfig.authenticateToken, userController.deletarUsuario);

// Redefinição de senha E-mail
router.post('/enviosenha', sendPasswordController.sendPassword);

// Atualização de Senha
router.post('/atualizarsenha', sendPasswordController.updatePassword);

module.exports = router;
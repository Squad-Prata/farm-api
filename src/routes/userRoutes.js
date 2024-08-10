const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const sendPasswordController = require('../controllers/sendPasswordController');
const autheConfig = require('../middlewares/auth');
const multer = require('multer');
const path = require('path');

// Configurar o multer para armazenar as imagens na pasta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

// Cadastros de usuarios
router.post('/cadastro-admin', upload.single('imagem'), userController.registrarAdmin);

// Cadastros de usuarios
router.post('/cadastro', upload.single('imagem'), userController.registrarUsuario);

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
router.post('/redefinir-senha', sendPasswordController.sendPassword);

// Atualização de Senha
router.post('/redefinir-senha/:email', sendPasswordController.updatePassword);

// Inativar usuarios
router.patch('/usuarios/inativar/:id', userController.inativarUsuario);

module.exports = router;
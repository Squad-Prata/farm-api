const express = require("express");
const userController = require("../controllers/userController.js");
const sendPasswordController = require("../controllers/sendPasswordController.js");
const autheConfig = require("../middlewares/auth.js");
const userMiddleware = require("../middlewares/user.js");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Configurar o multer para armazenar as imagens na pasta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//Saber se esta online
router.get("/", (_req, res) => res.json({ message: "© 2024 - Squad Prata está Online!" }))

// Admin register
router.post(
  "/admin-register",
  upload.single("image"),
  userMiddleware.validations,
  userController.adminRegister
);

// Users Register
router.post(
  "/register",
  upload.single("image"),
  userMiddleware.validations,
  userController.userRegister
);

// Users Login
router.post("/login", userController.userLogin);

// Users id search
router.get("/user/:id", autheConfig.authenticateToken, userController.userId);
router.get("/users", userController.users);

// Register Update
router.put(
  "/user/:id",
  autheConfig.authenticateToken,
  userController.userUpdate
);

// User Delete
router.delete(
  "/user/:id",
  autheConfig.authenticateToken,
  userController.userDelete
);

// Password Reset for E-mail
router.post("/password-reset", sendPasswordController.passwordReset);

// Password Update
router.post("/password-update/:email", sendPasswordController.passwordUpdate);

// User Inative
router.patch(
  "/users/inactivate/:id",
  autheConfig.authenticateToken,
  userController.userInactivate
);

module.exports = router;

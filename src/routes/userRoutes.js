import express from "express";
import userController from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/auth.js";
import { userValidations } from "../middlewares/user.js";
import sendPasswordController from "../controllers/sendPasswordController.js";
import multer from "multer";
import path from "path";


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
router.post("/admin-register", 
  upload.single("image"),
  userValidations,
  userController.adminRegister
);

// Users Register
router.post("/register",
  upload.single("image"),
  userValidations,
  userController.userRegister
);

// Users Login
router.post("/login", userController.userLogin);

// Users id search
router.get("/user/:id", 
  authenticateToken, 
  userController.userId
);

router.get("/users", userController.users);

// Register Update
router.put(
  "/user/:id",
  authenticateToken,
  userController.userUpdate
);

// User Delete
router.delete(
  "/user/:id",
  authenticateToken,
  userController.userDelete
);

// Password Reset for E-mail
router.post("/password-reset", sendPasswordController.passwordReset);

// Password Update
router.post("/password-update/:email", sendPasswordController.passwordUpdate);

// User Inative
router.patch(
  "/users/inactivate/:id",
  authenticateToken,
  userController.userInactivate
);

export default router;
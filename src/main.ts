// import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import allowedOrigins from "./application/config/cors.config";
import multerConfig from "./application/config/multer.config";
import { MulterAdapter } from "./infra/file/fileServer";
import { ExpressAdapter } from "./infra/http/httpServer";
import { UserRepositoryMemory } from "./user/user.repository";
import UserController from "./user/user.controller";
import SignController from "./user/sign.controller";

// dotenv.config();

const fileServer = new MulterAdapter(multerConfig);
const httpServer = new ExpressAdapter(allowedOrigins, fileServer);
const prisma = new PrismaClient();

// const userRepository = new UserRepositoryDatabase(prisma);
const userRepository = new UserRepositoryMemory();
const signController = new SignController(httpServer, userRepository);
const userController = new UserController(httpServer, userRepository);

httpServer.route( "get", "/", (params: any, body: any) => {return { message: "© 2024 - Squad Prata está Online!" }} )

signController.registerRoutes();
userController.registerRoutes();

httpServer.listen( Number(process.env.PORT) || 3001 );



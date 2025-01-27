import express, { Request, Response } from "express";
import cors from "cors";
import FileServer from "../file/fileServer";
import AuthError from "../../application/error/AuthError";
import TokenService from "../../application/services/token.service";
import TokenError from "../../application/error/TokenError";


export default interface HttpServer {
    static (url: string, root: string): void;
    route (method: string, url: string, callback: Function, statusCodeSuccess?: number): void;
    securityRoute (method: string, url: string, callback: Function, statusCodeSuccess?: number): void;
    imageRoute (method: string, url: string, callback: Function, statusCodeSuccess?: number): void;
    listen (port: number): void;
}

export class ExpressAdapter implements HttpServer {
    private app: any;

    constructor (readonly allowedOrigins: any[], readonly fileServer: FileServer)  {
      this.app = express();
      this.app.use(express.json());
      this.app.use(
        cors({
          origin: allowedOrigins,
          credentials: true,
        })
      );
    //   this.app.use("/uploads", express.static("uploads"));
    }
    
    static (url: string, root: string): void {
        this.app.use(url, express.static(root));
    }

    route(method: string, url: string, callback: Function, statusCodeSuccess: number = 200): void {
        this.app[method](url.replace(/\{|\}/g, ""), async function (req: Request, res: Response) {
            try {
                const output = await callback(req.params, req.body);
                res.status(statusCodeSuccess).json(output);
            } catch (e: any) {
                res.status(handleStatusCode(e)).json({ message: e.message });
            };
        });
    }

    securityRoute (method: string, url: string, callback: Function, statusCodeSuccess: number = 200): void {
        this.app[method](url.replace(/\{|\}/g, ""), async function (req: Request, res: Response) {
            const token = new TokenService().validate(req.headers['authorization']);
            try {
                const authHeader = req.headers['authorization'];
                const authDecoded = authHeader;    
                const output = await callback(req.params, req.body, authDecoded );
                res.status(statusCodeSuccess).json(output);
            } catch (e: any) {
                res.status(handleStatusCode(e)).json({ message: e.message });
            };
        });
    }

    imageRoute (method: string, url: string, callback: Function, statusCodeSuccess: number = 200): void {
        this.app[method](url.replace(/\{|\}/g, ""), /*authenticateToken, */this.fileServer.single("image"), async function (req: Request, res: Response) {
           if (!req.file) return res.status(400).send('Nenhum arquivo enviado');
            try {
                const authHeader = req.headers['authorization'];
                const authDecoded = authHeader;    
                const output = await callback(req.params, req.file, authDecoded);
                res.status(statusCodeSuccess).json(output);
            } catch (e: any) {
                res.status(handleStatusCode(e)).json({ message: e.message });
            };
        });
    };

    listen(port: number): void {
        this.app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
    }
}
    

function handleStatusCode(e: any): number {
    let errorCode: number = 500;
    if (e.typeOf === AuthError) errorCode = 401;
    if (e.typeOf === TokenError) errorCode = 403; 
    // if (e.typeOf === DomainError) errorCode = 422;
    return errorCode; 
}
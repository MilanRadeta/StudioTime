import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth"
import { Request, Response } from "express";

@Catch(FirebaseError)
export class FirebaseErrorFilter implements ExceptionFilter {
    catch({ code, message }: FirebaseError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const { url: path } = ctx.getRequest<Request>();

        if (code === AuthErrorCodes.WEAK_PASSWORD) {
            const status = HttpStatus.BAD_REQUEST;
            response
                .status(status)
                .json({
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path,
                    message,
                });
            return;

        }
    }
}
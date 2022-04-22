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
        const errorCodes = [AuthErrorCodes.WEAK_PASSWORD, AuthErrorCodes.INVALID_PASSWORD] as string[];
        
        if (errorCodes.includes(code)) {
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
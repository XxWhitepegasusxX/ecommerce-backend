import 'reflect-metadata'
import "express-async-errors"
import express, { NextFunction, Request, Response } from 'express'

import '@shared/container'
import { AppError } from '@shared/errors/AppError';
import { router } from "./routes";

const app = express();

app.use(express.json())

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            message: err.message
        })
    }

    return res.status(500).json({
        status: "Error",
        message: `Internal server error - ${err.message}`
    })
})

app.listen(3333, () => console.log("Server Running 🚀"))


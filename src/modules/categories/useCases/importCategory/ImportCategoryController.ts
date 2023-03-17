import { container } from "tsyringe";
import { Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController{
    async handle(req: Request, res: Response): Promise<Response>{

        const { file } = req

        const importCategoryUseCase = container.resolve(ImportCategoryUseCase)
        try{
            await importCategoryUseCase.execute(file)
        }catch(e){
            console.log(e)
        }

        return res.status(201).send()

    }
}

export { ImportCategoryController }
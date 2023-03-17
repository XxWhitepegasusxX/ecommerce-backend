import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from '@errors/AppError';
import { DeleteProductUseCase } from "./DeleteProductUseCase";

class DeleteProductController{

    async handle(req: Request, res: Response): Promise<Response>{

        const { id } = req.params;

        const deleteProductUseCase = container.resolve(DeleteProductUseCase)

        try{
            await deleteProductUseCase.execute(id)
        }catch(e){
            throw new AppError(e)
        }

        return res.status(200).send()
    }
}

export { DeleteProductController }